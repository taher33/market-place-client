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
            <Listings name="Featured" />
            <Listings name="newest on the market" />
            <Listings
              name="from sellers you're following"
              query="?following=true"
            />
          </div>
        </main>
      </div>
    </>
  );
}

export default Main;
