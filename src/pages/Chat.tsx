import React, { ReactElement, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ChatPeople } from "../components/chatpeople";
import Message from "../components/message";
import SidebarFeed from "../components/SidebarFeed";
import styles from "../styles/chat.module.scss";
import { useAppContext } from "../utils/context";
import { ChatUser, Messages, Thread, User } from "../utils/types";
import { useQuery as getQueryParams } from "../utils/usequery";
import { axios_instance } from "../utils/axios";
import { trimStrings } from "../utils/useFullFunctions";
import { BiArrowBack, BiGridSmall } from "react-icons/bi";
import { userInfo } from "os";
import { threadId } from "worker_threads";

interface Props {}
interface MessageForm {
  content: string;
}
interface GetUsersType {
  status: string;
  Connectedusers: string[];
}
function Chat({}: Props): ReactElement {
  const { user, socket } = useAppContext();

  const { handleSubmit, register, reset } = useForm<MessageForm>();
  const query = getQueryParams();
  const thread = query.get("id");

  const [showUsers, setShowUsers] = useState(true);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [Threads, setThreads] = useState<Thread[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<string[]>();
  const [selectedUser, setSelectedThread] = useState<string | null>(null);

  const threadQuery = useQuery(
    ["threads"],
    () =>
      axios_instance(true)({
        url: "users/threads",
        method: "GET",
      }),
    {
      onSuccess: (data) => setThreads(data?.data.newThread),
    }
  );

  useEffect(() => {
    let isSubscibed = true;

    socket?.on("private message", ({ msg, threadId }) => {
      if (threadId === thread && isSubscibed) {
        let newMessages = [...messages];
        newMessages.push(msg);
        setMessages(newMessages);
      } else {
        // setThreads((prev) => {
        //   prev.find((thr) => thr._id === threadId)?.messages.push(msg);
        //   return prev;
        // });
      }
    });
    return () => {
      isSubscibed = false;
    };
  }, [messages, thread, socket]);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const readMessages = (messages: Messages[]) => {
    const unreadMessages = messages
      .filter((el) => !el.read)
      .filter((el) => el.sender !== user?._id);
    return unreadMessages;
  };

  //todo fix the error
  useEffect(() => {
    if (!user || !thread) return;
    let payload = {
      threadId: thread,
    };
    socket?.emit(
      "get previous messages",
      payload,
      ({ status, prevMessages, error }: any) => {
        if (status === "error") return console.log(error);
        const unreadMessages = readMessages(prevMessages);
        setMessages(prevMessages);
        if (!unreadMessages.length) return;
        updateMessages.mutate(unreadMessages);
        //all messages are read here
        setMessages(prevMessages);
      }
    );
  }, [thread, socket, user, user?._id, readMessages, updateMessages]);

  const SendMessage = async (data: MessageForm) => {
    if (!thread && !user) return;
    let payload = {
      content: data.content,
      sender: user?._id,
      threadId: thread,
    };
    socket?.emit(
      "private message",
      payload,
      (res: { status: string; msg: any; error: any }) => {
        if (res.status === "error") return console.error(res.error);
        let newMessages = [...messages];
        newMessages.push(res.msg);
        setMessages(newMessages);
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
            ChatUsers={Threads}
            show={showUsers}
            setShow={setShowUsers}
          />
        )}
      </div>
      <div className={styles.lineBreak}></div>
      <div className={styles.mainChat}>
        <div className={styles.messagesWrapper}>
          {messages &&
            messages.map((message, id) => (
              <Message
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
        {Threads &&
          Threads.map((thread) => (
            <Link key={thread._id} to={"/chat?id=" + thread._id}>
              <ThreadUi
                thread={thread}
                selectedUser={selectedUser}
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

interface ThreadProps {
  thread: Thread;
  selectedUser: string | null;
  setSelectedThread: React.Dispatch<React.SetStateAction<string | null>>;
  connectedUsers: string[] | undefined;
}

function ThreadUi({
  thread,
  setSelectedThread,
  selectedUser,
  connectedUsers,
}: ThreadProps) {
  const { user } = useAppContext();
  const [unreadMessages, setUnreadMessages] = useState(thread.unreadMsg);

  useEffect(() => {
    thread.connected = connectedUsers?.includes(thread.client._id);
  }, [connectedUsers, thread]);

  //ui
  return (
    <div
      onClick={() => {
        setSelectedThread(thread._id);
        setUnreadMessages(0);
      }}
      className={`${styles.user} ${
        thread._id === selectedUser ? styles.selected : null
      }`}
    >
      <img src="food.jpg" alt="user" />
      <div className={thread.connected ? styles.connectedUser : ""}>
        <h5>{thread.client.name}</h5>
        <p>{trimStrings(thread.lastMessage.content, 20)}</p>
        {!!unreadMessages && (
          <div className={styles.unread}>
            <span>{unreadMessages}</span>
          </div>
        )}
      </div>
    </div>
  );
}
