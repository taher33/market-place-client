import React, { ReactElement, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { GrSearch } from "react-icons/gr";
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io";
import { BiMenu } from "react-icons/bi";
import { PhoneMenu } from "./phonemenu";
import { useAppContext } from "../utils/context";
import Notifictaions from "./Notifictaions";
import { toast, ToastContainer } from "react-toastify";
import { Messages, Search } from "../utils/types";
import { trimStrings } from "../utils/useFullFunctions";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/navbar.module.scss";
import { useForm } from "react-hook-form";

interface Props {
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function Navbar({ setSearch }: Props): ReactElement {
  const { user, socket } = useAppContext();
  const [show, setShow] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const router = useHistory();
  const location = router.location.pathname;
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<Search>();

  const createAtoast = (msg: Messages) => {
    toast("new message : " + trimStrings(msg.content, 20), {
      position: "bottom-right",
      autoClose: 3000,
      closeOnClick: true,
    });
  };

  useEffect(() => {
    let cancel = false;
    if (!cancel) {
      if (!location.startsWith("/chat")) {
        socket?.on("private message", ({ msg }) => {
          createAtoast(msg);
        });
      }
    }
    return () => {
      cancel = false;
    };
  }, [location, socket]);

  const onSearch = (data: Search) => {
    router.push("/search");
    setSearch(data.search);
  };

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
        <form onSubmit={handleSubmit(onSearch)} className={styles.searchBar}>
          <input
            {...register("search", { minLength: 4 })}
            type="search"
            placeholder="search for products"
          />
          <button disabled={isSubmitting || !isValid} type="submit">
            <GrSearch />
          </button>
        </form>
        <div className={styles.links}>
          {user?.name ? null : (
            <>
              <Link to="/signup">sign up</Link>
              <Link to="/login">login</Link>
            </>
          )}
        </div>
        {user?.name && (
          <div className={styles.notification}>
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
            <Notifictaions setShow={setNotifications} show={notifications} />
          </div>
        )}
        <div className={styles.svgMenu}>
          <BiMenu onClick={() => setShow(!show)} />
          <PhoneMenu setShow={setShow} show={show} />
        </div>
      </div>
    </>
  );
}

export default Navbar;
