import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import SidebarFeed from "../components/SidebarFeed";

import styles from "../styles/categories.module.scss";

interface Props {}

function Categories({}: Props): ReactElement {
  const {} = useQuery("products");
  return (
    <div className={styles.container}>
      <aside>
        <SidebarFeed />
      </aside>
      <main>
        <div className={styles.categories}>
          <Link to="?categorie=cloths">cloths</Link>
          <Link to="?categorie=beauty">beauty</Link>
          <Link to="?categorie=sports">sports</Link>
          <Link to="?categorie=games">games</Link>
        </div>
        <div className={styles.listings}></div>
      </main>
    </div>
  );
}

export default Categories;
