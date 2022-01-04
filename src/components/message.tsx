import React, { ReactElement, useEffect, useRef } from "react";

import styles from "../styles/message.module.scss";

interface Props {
  myMessage?: boolean;
  content: string;
  lastMessage: boolean;
}

function Message({ myMessage, content, lastMessage }: Props): ReactElement {
  const tailMessage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (lastMessage) tailMessage.current!.scrollIntoView();
  }, [lastMessage]);
  return (
    <div
      ref={tailMessage}
      className={myMessage ? styles.container : styles.sender}
    >
      {!myMessage && <img src="/hero.jpg" alt="user" />}
      <p>{content}</p>
    </div>
  );
}

export default Message;
