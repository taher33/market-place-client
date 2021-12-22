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
        <main>
          <div className={styles.listings}>
            <Listings name="Featured" seeMore />
            <Listings name="newest on the market" seeMore />
            <Listings name="recomended" />
          </div>
        </main>
      </div>
    </>
  );
}

export default Main;
