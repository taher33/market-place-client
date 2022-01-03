import React, { ReactElement, useEffect, useState } from "react";
import { useQuery } from "react-query";
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
import { BiArrowBack, BiGridSmall } from "react-icons/bi";

interface Props {}
interface MessageForm {
  content: string;
}
interface GetUsersType {
  status: string;
  Connectedusers: string[];
  threads: Thread[];
}
function Chat({}: Props): ReactElement {
  const { user, socket } = useAppContext();

  const { handleSubmit, register, reset } = useForm<MessageForm>();
  const query = getQueryParams();
  const thread = query.get("id");

  const [showUsers, setShowUsers] = useState(true);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [Threads, setThreads] = useState<Thread[]>([]);
  const [selectedUser, setSelectedThread] = useState<string | null>(null);

  useEffect(() => {
    let isSubscibed = true;
    socket.on("private message", ({ msg, threadId }) => {
      console.log("hello 1");
      if (threadId === thread && isSubscibed) {
        let newMessages = [...messages];
        newMessages.push(msg);
        setMessages(newMessages);
      } else {
        console.log(msg.content);
      }
    });
    return () => {
      isSubscibed = false;
    };
  }, [messages, thread, socket]);

  useEffect(() => {
    let payload = {
      _id: user._id,
    };
    socket.emit(
      "get connected users",
      payload,
      ({ status, threads, Connectedusers }: GetUsersType) => {
        Connectedusers.forEach((socketUser) => {
          threads?.forEach((el: Thread) => {
            let partner;
            if (el.clients[0]._id === user._id) partner = el.clients[1]._id;
            else partner = el.clients[0]._id;
            if (socketUser === partner || el.connected) {
              el.connected = true;
            } else el.connected = false;
          });
        });
        threads.forEach((el) => {
          if (el.clients[0]._id === user._id) el.clients = [el.clients[1]];
          else el.clients = [el.clients[0]];
        });
        setThreads(threads);
      }
    );
  }, [socket, user._id]);

  const readMessages = (messages: Messages[]) => {
    messages.filter((el) => el.read);
  };

  useEffect(() => {
    if (!user || !thread) return;
    let payload = {
      threadId: thread,
    };
    socket.emit(
      "get previous messages",
      payload,
      ({ status, prevMessages, error }: any) => {
        if (status === "error") return console.log(error);
        setMessages(prevMessages);
        readMessages(prevMessages);
      }
    );
  }, [thread, socket, user, user._id]);

  const SendMessage = async (data: MessageForm) => {
    if (!thread && !user) return;
    let payload = {
      content: data.content,
      sender: user._id,
      threadId: thread,
    };
    socket.emit(
      "private message",
      payload,
      (res: { status: string; msg: any; error: any }) => {
        if (res.status === "error") return console.log(res.error);
        let newMessages = [...messages];
        newMessages.push(res.msg);
        setMessages(newMessages);
      }
    );
    reset();
  };
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
                myMessage={user._id === message.sender}
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
              <div
                onClick={() => {
                  setSelectedThread(thread._id);
                }}
                className={`${styles.user} ${
                  thread._id === selectedUser ? styles.selected : null
                }`}
              >
                <img src="food.jpg" alt="user" />
                <div className={thread.connected ? styles.connectedUser : ""}>
                  <h5>{thread.clients[0].name}</h5>
                  <p>last message</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Chat;
