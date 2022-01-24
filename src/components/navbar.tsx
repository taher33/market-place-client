import React, { ReactElement, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { GrSearch } from "react-icons/gr";
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io";
import { BiMenu } from "react-icons/bi";
import styles from "../styles/navbar.module.scss";
import { PhoneMenu } from "./phonemenu";
import { useAppContext } from "../utils/context";
import Notifictaions from "./Notifictaions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Messages } from "../utils/types";
import { trimStrings } from "../utils/useFullFunctions";

interface Props {}

function Navbar({}: Props): ReactElement {
  const [show, setShow] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const { user, socket } = useAppContext();
  const router = useHistory();
  const location = router.location.pathname;

  const createAtoast = (msg: Messages) => {
    toast(trimStrings(msg.content, 20) + " from " + msg.sender, {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
    });
  };

  useEffect(() => {
    if (!location.startsWith("chat")) {
      socket.on("private message", ({ msg }) => {
        console.log("toast 1");
        createAtoast(msg);
      });
    }
    return;
  }, [location, socket]);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        newestOnTop={false}
        rtl={false}
      />
      <div className={styles.container}>
        <Link to="/" onClick={() => setShow(false)}>
          <img src="logo.png" alt="logo" />
        </Link>
        <div className={styles.searchBar}>
          <input type="search" />
          <button>
            <GrSearch />
          </button>
        </div>
        <div className={styles.links}>
          {
            //! remove this here: the h3, look for the design.
          }
          {user.name ? (
            <h3 style={{ margin: 0 }}>{user.name}</h3>
          ) : (
            <>
              <Link to="/signup">sign up</Link>
              <Link to="/login">login</Link>
            </>
          )}
        </div>
        <div className={styles.notification}>
          {user.name && (
            <button
              onClick={() => setNotifications(!notifications)}
              className={styles.notificationsbtn}
            >
              {notifications ? (
                <IoIosNotifications />
              ) : (
                <IoIosNotificationsOutline />
              )}
            </button>
          )}
          {notifications && (
            <Notifictaions setShow={setNotifications} show={notifications} />
          )}
        </div>
        <div className={styles.svgMenu}>
          <BiMenu onClick={() => setShow(!show)} />
          {show && <PhoneMenu setShow={setShow} show={show} />}
        </div>
      </div>
    </>
  );
}

export default Navbar;
