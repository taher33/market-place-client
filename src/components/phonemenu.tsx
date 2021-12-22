import React, { useState } from "react";
import { useAppContext } from "../utils/context";

import {
  BiHomeAlt,
  BiMessageSquareDots,
  BiUpload,
  BiUser,
} from "react-icons/bi";
import { CgSelect } from "react-icons/cg";
import { Link, useHistory } from "react-router-dom";

import styles from "../styles/phoneMenu.module.scss";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
export function PhoneMenu({ setShow }: Props) {
  const router = useHistory();
  const location = router.location.pathname;
  const { user } = useAppContext();

  return (
    <div onClick={() => setShow(false)} className={styles.container}>
      <div className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
        <ul>
          <li
            id="home"
            className={`${
              location.match("/") && location.length === 1
                ? styles.selected
                : ""
            }`}
          >
            <Link to="/" onClick={() => setShow(false)}>
              <BiHomeAlt /> home
            </Link>
          </li>
          <li
            id="messages"
            className={`${location.startsWith("/chat") && styles.selected}`}
          >
            <Link to="/chat" onClick={() => setShow(false)}>
              <BiMessageSquareDots />
              messages
            </Link>
          </li>
          <li
            id="categories"
            className={`${
              location.startsWith("/categories") && styles.selected
            }`}
          >
            <Link to="/categories" onClick={() => setShow(false)}>
              <CgSelect />
              categories
            </Link>
          </li>
          <li
            id="profile"
            className={`${location.startsWith("/profile") && styles.selected}`}
          >
            <Link to={"/profile?id=" + user._id} onClick={() => setShow(false)}>
              <BiUser />
              profile
            </Link>
          </li>
          <li
            id="uplaod"
            className={`${location.startsWith("/upload") && styles.selected}`}
          >
            <Link onClick={() => setShow(false)} to="/upload">
              <BiUpload />
              upload
            </Link>
          </li>
          <button onClick={() => setShow(false)}>
            <Link to="/login">login</Link>
          </button>
        </ul>
      </div>
    </div>
  );
}
