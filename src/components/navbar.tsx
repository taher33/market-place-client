import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

import { BsSearch } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";
import styles from "../styles/navbar.module.scss";

interface Props {}

function Navbar({}: Props): ReactElement {
  return (
    <div className={styles.container}>
      <Link to="/">
        <img src="logo.png" alt="logo" />
      </Link>
      <div className={styles.searchBar}>
        <input type="text" />
        <button>
          <BsSearch />
        </button>
      </div>
      <div className={styles.links}>
        <Link to="/signup">sign up</Link>
        <Link to="/signup">login</Link>
      </div>
      <div className={styles.svgMenu}>
        <BiMenu />
      </div>
    </div>
  );
}

export default Navbar;
