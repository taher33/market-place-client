import React, { ReactElement, useState } from "react";
import { Link } from "react-router-dom";

import { GrSearch } from "react-icons/gr";
import { BiMenu } from "react-icons/bi";
import styles from "../styles/navbar.module.scss";
import { PhoneMenu } from "./phonemenu";
import { useAppContext } from "../utils/context";

interface Props {}

function Navbar({}: Props): ReactElement {
  const [show, setShow] = useState(false);
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
      <div className={styles.svgMenu}>
        <BiMenu onClick={() => setShow(!show)} />
        {show && <PhoneMenu setShow={setShow} show={show} />}
      </div>
    </div>
  );
}

export default Navbar;
