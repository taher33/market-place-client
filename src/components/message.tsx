import React, { ReactElement } from "react";

import styles from "../styles/message.module.scss";

interface Props {
  myMessage?: boolean;
  content: string;
}

function Message({ myMessage, content }: Props): ReactElement {
  return (
    <div className={myMessage ? styles.container : styles.sender}>
      {!myMessage && <img src="/hero.jpg" alt="user" />}
      <p>{content}</p>
    </div>
  );
}

export default Message;
