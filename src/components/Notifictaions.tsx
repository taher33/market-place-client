import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "../styles/notifications.module.scss";
import { axios_instance } from "../utils/axios";
import { useQuery } from "react-query";
import FullPageLoader from "./fullPageLoader";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function Notifications(props: Props): JSX.Element {
  const notifcationsQuery = useQuery(["notifcations"], () =>
    axios_instance(true)({
      method: "GET",
      url: "users/checkNotifications",
    })
  );

  //ui
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <button onClick={() => props.setShow(false)}>close</button>
        <h3>notifications</h3>
      </div>
      <div className={styles.lineBreak}></div>
      <div className={styles.notificationsWrapper}>
        {notifcationsQuery.isLoading ? (
          <div className={styles.loader}>
            <FullPageLoader />
          </div>
        ) : notifcationsQuery.isSuccess ? (
          <div>
            <Link to="#" className={styles.notification}>
              <h5>omar</h5>
              <p>has sent you a message</p>
              <span>hey man what is up</span>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Notifications;
