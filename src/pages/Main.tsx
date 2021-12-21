import React, { ReactElement } from "react";
import Listings from "../components/Listings";
import SidebarFeed from "../components/SidebarFeed";

import styles from "../styles/main.module.scss";

interface Props {}

function Main({}: Props): ReactElement {
  return (
    <>
      <div className={styles.container}>
        <aside>
          <SidebarFeed />
        </aside>
        <div className={styles.main}>
          <div className={styles.mainFeed}>
            <div className={styles.listings}>
              <Listings name="food" seeMore />
              <Listings name="Cars" seeMore />
              <Listings name="recomended" seeMore />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
