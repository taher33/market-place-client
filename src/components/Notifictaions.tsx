import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "../styles/notifications.module.scss";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function Dialog(props: Props): JSX.Element {
  //ui
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <button onClick={() => props.setShow(false)}>close</button>
        <h3>notifications</h3>
      </div>
      <div className={styles.lineBreak}></div>
      <div className={styles.notificationsWrapper}>
        <Link to="#" className={styles.notification}>
          <h5>omar</h5>
          <p>has sent you a message</p>
          <span>hey man what is up</span>
        </Link>
        <Link to="#" className={styles.notification}>
          <h5>omar</h5>
          <p>has sent you a message</p>
          <span>hey man what is up</span>
        </Link>
        <Link to="#" className={styles.notification}>
          <h5>omar</h5>
          <p>has sent you a message</p>
          <span>hey man what is up</span>
        </Link>
      </div>
    </div>
  );
}

export default Dialog;
