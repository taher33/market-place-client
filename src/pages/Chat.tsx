import React, { ReactElement } from "react";
import Message from "../components/message";
import SidebarFeed from "../components/SidebarFeed";

import styles from "../styles/chat.module.scss";

interface Props {}

function Chat({}: Props): ReactElement {
  return (
    <div className={styles.container}>
      <aside>
        <SidebarFeed />
      </aside>
      <div className={styles.mainChat}>
        <div className={styles.messagesWrapper}>
          <Message myMessage />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </div>
        <div className={styles.inputWrapper}>
          <form>
            <input type="text" />
            {/* <textarea name="" id="" cols={30} rows={5}></textarea> */}
            <button type="submit">send</button>
          </form>
        </div>
      </div>
      <div className={styles.people}></div>
    </div>
  );
}

export default Chat;
