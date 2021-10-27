import React, { ReactElement } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../styles/listings.module.scss";

interface Props {
  name: String;
}

function Listings({ name }: Props): ReactElement {
  const router = useHistory();

  const data = [1, 2, 3, 4, 5, 6];

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>{name}</h1>
        <Link to="#">
          <span>see all</span>
        </Link>
      </div>
      <div className={styles.itemsWrapper}>
        {data.map((el) => (
          <div key={el} className={styles.item}>
            <img
              src="/food.jpg"
              alt="item"
              onClick={() => {
                router.replace("/product?id=" + el);
              }}
            />
            <div className={styles.details}>
              <p>good for health</p>
              <h3>36 USD</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Listings;
