import React, { ReactElement, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ChatPeople } from "../components/chatpeople";
import Message from "../components/message";
import SidebarFeed from "../components/SidebarFeed";
import { useAppContext } from "../utils/context";
import { ChatUser, Messages, Thread, User } from "../utils/types";
import { useQuery as getQueryParams } from "../utils/usequery";
import { axios_instance } from "../utils/axios";
import { trimStrings } from "../utils/useFullFunctions";
import { BiArrowBack, BiGridSmall } from "react-icons/bi";

import styles from "../styles/chat.module.scss";
import ThreadUi from "../components/threadUi";

interface Props {}
interface MessageForm {
  content: string;
}
interface GetUsersType {
  status: string;
  Connectedusers: string[];
}
function Chat({}: Props): JSX.Element {
  const { user, socket } = useAppContext();

  const { handleSubmit, register, reset } = useForm<MessageForm>();
  const query = getQueryParams();
  const thread_id = query.get("id");
  const queryClient = useQueryClient();

  const [showUsers, setShowUsers] = useState(true);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<string[]>();
  const [selectedThread, setSelectedThread] = useState<Thread>();

  const threadQuery = useQuery(
    ["threads"],
    () =>
      axios_instance(true)({
        url: "users/threads",
        method: "GET",
      }),
    {
      onSuccess: (data) => {
        if (thread_id)
          setSelectedThread(
            data.data.newThread.filter((el: Thread) => el._id === thread_id)[0]
          );
      },
    }
  );

  useEffect(() => {
    let isSubscibed = true;

    socket?.on("private message", ({ msg, threadId }) => {
      if (threadId === thread_id && isSubscibed) {
        let newMessages = [...messages];
        newMessages.push(msg);
        setMessages(newMessages);
      } else {
        queryClient.invalidateQueries("threads");
      }
    });
    return () => {
      isSubscibed = false;
    };
  }, [messages, thread_id, socket, queryClient]);

  useEffect(() => {
    let payload = {
      _id: user?._id,
    };
    socket?.emit(
      "get connected users",
      payload,
      ({ status, Connectedusers }: GetUsersType) => {
        setConnectedUsers(Connectedusers);
      }
    );
  }, [socket, user?._id]);

  // muation
  const updateMessages = useMutation((messages: Messages[]) =>
    axios_instance(true)({
      method: "PATCH",
      url: "users/messages",
      data: { messages },
    })
  );
  // useFull function
  const readMessages = (messages: Messages[]) => {
    const unreadMessages = messages
      .filter((el) => !el.read)
      .filter((el) => el.sender !== user?._id);
    return unreadMessages;
  };

  //todo fix the error
  //todo chnage to react-query

  useEffect(() => {
    if (!user?._id || !thread_id) return;

    let payload = {
      threadId: thread_id,
    };

    console.log("here in useEffect", threadQuery.data?.data);
    setSelectedThread(
      threadQuery.data?.data.newThread.filter(
        (el: Thread) => el._id === thread_id
      )[0]
    );

    socket?.emit(
      "get previous messages",
      payload,
      ({ status, prevMessages, error }: any) => {
        if (status === "error") return console.log(error);
        setMessages(prevMessages);
        const unreadMessages = readMessages(prevMessages);

        if (!unreadMessages.length) return;

        updateMessages.mutate(unreadMessages);

        //all messages are read here
        // setMessages(prevMessages);
      }
    );
  }, [thread_id, user?._id]);

  const SendMessage = async (data: MessageForm) => {
    if (!thread_id && !user) return;
    let payload = {
      content: data.content,
      sender: user?._id,
      threadId: thread_id,
    };
    socket?.emit(
      "private message",
      payload,
      (res: { status: string; msg: any; error: any }) => {
        if (res.status === "error") return console.error(res.error);
        setMessages([...messages, res.msg]);
      }
    );
    reset();
  };

  // ui
  return (
    <div className={styles.container}>
      <aside>
        <SidebarFeed />
      </aside>
      <div className={styles.peoplePhone}>
        <div className={styles.selectUser}>
          <button onClick={() => setShowUsers(!showUsers)}>
            <BiArrowBack />
          </button>
          ✨<p>chat</p>
        </div>
        {showUsers && (
          <ChatPeople
            setSelectedThread={setSelectedThread}
            threads={threadQuery?.data?.data.newThread}
            show={showUsers}
            setShow={setShowUsers}
            thread_id={thread_id}
          />
        )}
      </div>
      <div className={styles.lineBreak}></div>
      <div className={styles.mainChat}>
        <div className={styles.messagesWrapper}>
          {messages &&
            messages.map((message, id) => (
              <Message
                img={selectedThread?.client.profileImg}
                key={id}
                content={message.content}
                myMessage={user?._id === message.sender}
                lastMessage={id === messages.length - 1}
              />
            ))}
        </div>
        <div className={styles.inputWrapper}>
          <form onSubmit={handleSubmit(SendMessage)}>
            <input
              type="text"
              {...register("content")}
              placeholder="write a message"
            />
            <button type="submit">send</button>
          </form>
        </div>
      </div>
      <div className={styles.people}>
        <h3>recent</h3>
        {threadQuery?.data?.data.newThread &&
          threadQuery.data.data.newThread.map((thread: Thread) => (
            <Link key={thread._id} to={"/chat?id=" + thread._id}>
              <ThreadUi
                thread_id={thread_id}
                thread={thread}
                selectedUser={selectedThread}
                setSelectedThread={setSelectedThread}
                connectedUsers={connectedUsers}
              />
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Chat;
