import React, { ReactElement } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { useMutation, useQuery } from "react-query";
import SidebarFeed from "../components/SidebarFeed";

import styles from "../styles/profile.module.scss";
import { axios_instance } from "../utils/axios";
import { useAppContext } from "../utils/context";
import { Product } from "../utils/types";
import { useQuery as getQuery } from "../utils/usequery";

interface Props {}

function Profile({}: Props): ReactElement {
  const userId = getQuery().get("id");
  const followUser = () => {
    console.log(me);
  };
  const { user } = useAppContext();
  const me = user._id === userId;
  const { data, isLoading, isError } = useQuery(["products"], () =>
    axios_instance(true)({
      method: "GET",
      url: "products",
    })
  );
  const followQuery = useMutation(["follow"], () =>
    axios_instance(true)({
      method: "POST",
      url: "users",
    })
  );
  return (
    <div className={styles.container}>
      <aside>
        <SidebarFeed />
      </aside>
      <div className={styles.profileWrapper}>
        <div className={styles.userDesc}>
          <img src="food.jpg" alt="user" />
          <div className={styles.details}>
            <div className={styles.header}>
              <h2>UserName</h2>
              <button>message</button>
              {!me && <button onClick={followUser}>follow</button>}
              <FiMoreHorizontal />
            </div>
            <div className={styles.about}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
              nihil. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Maiores, molestias.
            </div>
          </div>
        </div>
        {/* <div className={styles.divider}></div> */}
        <div className={styles.products}>
          {isLoading ? (
            <h2>loading</h2>
          ) : isError ? (
            <h2 style={{ color: "red" }}>error</h2>
          ) : (
            <div className={styles.listings}>
              {data?.data.products.map((product: Product) => (
                <div key={product._id} className={styles.item}>
                  <img
                    src={product.pictures[0]}
                    alt="item"
                    onClick={() => {
                      // router.replace("/product?id=" + product._id);
                    }}
                  />
                  <div className={styles.details}>
                    <p>{product.description}</p>
                    <h3>{product.price} USD</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
