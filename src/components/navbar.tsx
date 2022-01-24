import React, { ReactElement, useState } from "react";
import { Link } from "react-router-dom";

import { GrSearch } from "react-icons/gr";
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io";
import { BiMenu } from "react-icons/bi";
import styles from "../styles/navbar.module.scss";
import { PhoneMenu } from "./phonemenu";
import { useAppContext } from "../utils/context";
import Notifictaions from "./Notifictaions";

interface Props {}

function Navbar({}: Props): ReactElement {
  const [show, setShow] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const { user } = useAppContext();
  return (
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
          //! remove this shit
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
  );
}

export default Navbar;
