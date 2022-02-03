import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "../styles/notifications.module.scss";
import { axios_instance } from "../utils/axios";
import { useQuery } from "react-query";
import { AiOutlineClose } from "react-icons/ai";
import FullPageLoader from "./fullPageLoader";
import { Notification } from "../utils/types";
import { trimStrings } from "../utils/useFullFunctions";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function Notifications(props: Props): JSX.Element {
  const [notifications, setNotifications] = useState<Notification[]>();

  const notifcationsQuery = useQuery(
    ["notifcations"],
    () =>
      axios_instance(true)({
        method: "GET",
        url: "users/checkNotifications",
      }),
    {
      onSuccess: (data) => setNotifications(data.data.notifications),
    }
  );

  //ui
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>notifications</h3>
        <AiOutlineClose onClick={() => props.setShow(false)} />
      </div>
      <div className={styles.lineBreak}></div>
      <div className={styles.notificationsWrapper}>
        {notifcationsQuery.isLoading ? (
          <div className={styles.loader}>
            <FullPageLoader />
          </div>
        ) : notifcationsQuery.isSuccess && notifications?.length === 0 ? (
          <p style={{ textAlign: "center" }}>no notifications for now</p>
        ) : (
          notifications?.map((el) => {
            return (
              <div key={el._id}>
                <Link to="#">
                  <img src={el.creator.profileImg} alt="profile" />
                  <div className={styles.text}>
                    <h4>{el.creator.name} </h4>
                    <p>{trimStrings(el.body, 35)}</p>
                  </div>
                  <div className={styles.actions}>
                    <HiOutlineDotsHorizontal />
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Notifications;
