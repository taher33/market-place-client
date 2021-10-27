import React, { ReactElement } from "react";

import styles from "../styles/message.module.scss";

interface Props {
  myMessage?: boolean;
}

function Message({ myMessage }: Props): ReactElement {
  return (
    <div className={myMessage ? styles.container : styles.sender}>
      {!myMessage && <img src="/hero.jpg" alt="user" />}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis quia,
      </p>
    </div>
  );
}

export default Message;
