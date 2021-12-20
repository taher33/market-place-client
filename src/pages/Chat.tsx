import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactElement, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ChatPeople } from "../components/chatpeople";
import Message from "../components/message";
import SidebarFeed from "../components/SidebarFeed";
import styles from "../styles/chat.module.scss";
import { useAppContext } from "../utils/context";
import { ChatUser, Messages, User } from "../utils/types";
import { useQuery as getQueryParams } from "../utils/usequery";
import { axios_instance } from "../utils/axios";

interface Props {}
interface MessageForm {
  content: string;
}
function Chat({}: Props): ReactElement {
  const { user, socket } = useAppContext();

  const { handleSubmit, register, reset } = useForm<MessageForm>();
  const query = getQueryParams();
  const reciever = query.get("id");

  const [showUsers, setShowUsers] = useState(true);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<ChatUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    let isSubscibed = true;
    socket.on("private message", (msg: Messages) => {
      if (msg.sender === reciever && isSubscibed) {
        let newMessages = [...messages];
        newMessages.push(msg);
        setMessages(newMessages);
      } else {
      }
    });
    return () => {
      isSubscibed = false;
    };
  }, [messages, reciever, socket]);

  useEffect(() => {
    let payload = {
      _id: user._id,
    };
    socket.emit(
      "get connected users",
      payload,
      ({ status, users, Connectedusers }: any) => {
        Connectedusers.forEach((socketUser: ChatUser) => {
          users?.forEach((el: ChatUser) => {
            if (socketUser._id === el._id || el.connected) {
              el.connected = true;
            } else el.connected = false;
          });
        });
        setConnectedUsers(users);
        console.log(users, Connectedusers);
      }
    );
  }, [socket, user._id]);

  useEffect(() => {
    if (!user || !reciever) return;
    let payload = {
      sender: user._id,
      reciever,
    };
    socket.emit(
      "get previous messages",
      payload,
      ({ status, prevMessages, error }: any) => {
        if (status === "error") console.log(error);
        setMessages(prevMessages);
      }
    );
  }, [reciever, socket, user, user._id]);

  const SendMessage = async (data: MessageForm) => {
    if (!reciever && !user) return;
    let payload = {
      content: data.content,
      sender: user._id,
      reciever,
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
        {!showUsers && (
          <div className={styles.selectedUser}>
            <FontAwesomeIcon
              icon={faComment}
              onClick={() => setShowUsers(true)}
            />
            <p>maher</p>
          </div>
        )}
        {showUsers && <ChatPeople show={showUsers} setShow={setShowUsers} />}
      </div>
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
        <h2>recent</h2>
        {connectedUsers &&
          connectedUsers.map((User) => (
            <Link key={User._id} to={"/chat?id=" + User._id}>
              <div
                onClick={() => {
                  setSelectedUser(User._id);
                }}
                className={`${styles.user} ${
                  User._id === selectedUser ? styles.selected : null
                }`}
              >
                <img src="food.jpg" alt="user" />
                <div className={User.connected ? styles.connectedUser : ""}>
                  <h5>{User.name}</h5>
                  <p>last message</p>
                  {User.notification && <p>notification</p>}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Chat;
