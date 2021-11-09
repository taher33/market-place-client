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
          {/* <section>
            <h2>Categories</h2>
            <div className={styles.categories}>
              <div>
                <img src="/book.png" alt="book" />
                <p>books</p>
              </div>
              <div>
                <img src="/fashion.png" alt="book" />
                <p>books</p>
              </div>
              <div>
                <img src="/gamepad.png" alt="book" />
                <p>books</p>
              </div>
            </div>
          </section> */}
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
