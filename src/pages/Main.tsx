import React, { ReactElement } from "react";
import Listings from "../components/Listings";
import SidebarFeed from "../components/SidebarFeed";

import styles from "../styles/main.module.scss";

interface Props {}

function Main({}: Props): ReactElement {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.sideBar}>
          <SidebarFeed />
        </div>
        <div className={styles.main}>
          {/* <section className={styles.hero}>
            <h1>Start buying and selling on the web</h1>
            <p>
              get in contact with sellers from around the world or become a pro
              seller with our easy to use interface
            </p>
            <button>create an acount</button>
          </section> */}
          <div className={styles.mainFeed}>
            <div className={styles.listings}>
              <Listings name="food" />
              <Listings name="Cars" />
              <Listings name="recomended" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
