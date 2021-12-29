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

  const followUser = async () => {
    followQuery.mutate();
  };

  const { user } = useAppContext();
  const me = user._id === userId;

  const profile = useQuery(["profile"], () =>
    axios_instance(true)({
      method: "GET",
      url: "users/" + userId,
    })
  );

  const { data, isLoading, isError } = useQuery(["products"], () =>
    axios_instance(true)({
      method: "GET",
      url: "products",
    })
  );
  console.log(profile.data?.data);
  const followQuery = useMutation(["follow"], () =>
    axios_instance(true)({
      method: "PATCH",
      url: "users/follow",
      data: { email: profile.data?.data.user.email },
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
              <h2>Robert jenson</h2>
              {me && <button>edit profile</button>}
              {!me && <button onClick={followUser}>follow</button>}
              {!me && <button>message</button>}
              <button>
                <FiMoreHorizontal />
              </button>
            </div>
            <div className={styles.stats}>
              <p>2 products</p>
              <p>5 followers</p>
            </div>
            <div className={styles.about}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
              nihil. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Maiores, molestias.
            </div>
            <div className={styles.phoneActions}>
              {!me && <button onClick={followUser}>follow</button>}
              {!me && <button>message</button>}
              <button>
                <FiMoreHorizontal />
              </button>
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
