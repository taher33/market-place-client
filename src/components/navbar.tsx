import React, { ReactElement, useState } from "react";
import { Link } from "react-router-dom";

import { GrSearch } from "react-icons/gr";
import { BiMenu } from "react-icons/bi";
import styles from "../styles/navbar.module.scss";
import { PhoneMenu } from "./phonemenu";

interface Props {}

function Navbar({}: Props): ReactElement {
  const [show, setShow] = useState(false);
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
        <Link to="/signup">sign up</Link>
        <Link to="/login">login</Link>
      </div>
      <div className={styles.svgMenu}>
        <BiMenu onClick={() => setShow(!show)} />
        {show && <PhoneMenu setShow={setShow} show={show} />}
      </div>
    </div>
  );
}

export default Navbar;
