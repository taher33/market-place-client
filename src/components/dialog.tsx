import React, { useEffect } from "react";

import styles from "../styles/dialog.module.scss";

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
        <h2>Legate</h2>
      </div>
      <div className={styles.lineBreak}></div>
      <div className={styles.actionsWrapper}>
        <div className={styles.action}>change profile picture</div>
        <div className={styles.action}>logout</div>
      </div>
    </div>
  );
}

export default Dialog;
