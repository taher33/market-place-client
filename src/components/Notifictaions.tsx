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
import { animated, useTransition, easings } from "react-spring";

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
  //animations
  const transitions = useTransition(props.show, {
    from: { opacity: 0, y: 50 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 100 },
    reverse: props.show,

    config: {
      duration: 200,
      ease: easings.easeInOutQuart,
    },
  });

  //ui
  return transitions(
    (SpringStyles, item) =>
      item && (
        <animated.div style={SpringStyles} className={styles.wrapper}>
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
        </animated.div>
      )
  );
}

export default Notifications;
