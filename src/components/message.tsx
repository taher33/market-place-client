import React, { ReactElement, useEffect, useRef } from "react";

import styles from "../styles/message.module.scss";

interface Props {
  myMessage?: boolean;
  content: string;
  lastMessage: boolean;
  img?: string;
}

function Message({
  myMessage,
  content,
  lastMessage,
  img,
}: Props): ReactElement {
  const tailMessage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (lastMessage)
      tailMessage.current!.scrollIntoView({ behavior: "smooth" });
  }, [lastMessage]);
  return (
    <div
      ref={tailMessage}
      className={myMessage ? styles.container : styles.sender}
    >
      {!myMessage && <img src={img} alt="user" />}
      <p>{content}</p>
    </div>
  );
}

export default Message;
