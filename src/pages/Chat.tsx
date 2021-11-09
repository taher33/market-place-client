import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactElement, useState } from "react";

import Message from "../components/message";
import SidebarFeed from "../components/SidebarFeed";
import { ChatPeople, User } from "../components/chatpeople";

import styles from "../styles/chat.module.scss";

interface Props {}
const people = [1, 2, 3, 4];
function Chat({}: Props): ReactElement {
  const [showUsers, setShowUsers] = useState(true);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
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
          <Message myMessage />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message myMessage />
          <Message myMessage />
          <Message />
          <Message />
          <Message myMessage />
          <Message />
        </div>
        <div className={styles.inputWrapper}>
          <form>
            <input type="text" />
            <button type="submit">send</button>
          </form>
        </div>
      </div>
      <div className={styles.people}>
        <h2>recent</h2>
        {people.map((el) => (
          <div
            key={el}
            onClick={() => setSelectedUser(el)}
            className={`${styles.user} ${
              el === selectedUser ? styles.selected : null
            }`}
          >
            <img src="food.jpg" alt="user" />
            <div>
              <h5>user name</h5>
              <p>last message</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat;
