import React, { ReactElement, useState } from "react";

import {
  BiMessageSquareDots,
  BiHomeAlt,
  BiUser,
  BiUpload,
} from "react-icons/bi";
import { CgSelect } from "react-icons/cg";

import styles from "../styles/sidebarfeed.module.scss";
import { Link, useHistory } from "react-router-dom";

interface Props {}

const SidebarFeed = (): ReactElement => {
  const router = useHistory();
  const location = router.location.pathname;

  return (
    <div className={styles.container}>
      <ul>
        <li
          id="home"
          className={`${
            location.match("/") && location.length === 1 ? styles.selected : ""
          }`}
        >
          <Link to="/">
            <BiHomeAlt /> home
          </Link>
        </li>
        <li
          id="messages"
          className={`${location.startsWith("/chat") && styles.selected}`}
        >
          <Link to="/chat">
            <BiMessageSquareDots />
            messages
          </Link>
        </li>
        <li
          id="categories"
          className={`${location.startsWith("/categories") && styles.selected}`}
        >
          <Link to="/categories">
            <CgSelect />
            categories
          </Link>
        </li>
        <li
          id="profile"
          className={`${location.startsWith("/profile") && styles.selected}`}
        >
          <Link to="#">
            <BiUser />
            profile
          </Link>
        </li>
        <li
          id="uplaod"
          className={`${location.startsWith("/profile") && styles.selected}`}
        >
          <Link to="/uplaod">
            <BiUpload />
            upload
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarFeed;
