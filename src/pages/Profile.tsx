import React, { ReactElement, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { Facebook } from "react-spinners-css";
import EditProfile from "../components/editProfile";
import SidebarFeed from "../components/SidebarFeed";

import styles from "../styles/profile.module.scss";
import { axios_instance } from "../utils/axios";
import { useAppContext } from "../utils/context";
import { Product } from "../utils/types";
import { useQuery as getQuery } from "../utils/usequery";

interface Props {}

function Profile({}: Props): ReactElement {
  const userId = getQuery().get("id");
  const router = useHistory();

  const [following, setFollowing] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const followUser = async () => {
    followQuery.mutate();
  };

  const { user } = useAppContext();
  const me = user?._id === userId;

  //req profile user data
  const profile = useQuery(
    ["profile", userId],
    () =>
      axios_instance(true)({
        method: "GET",
        url: "users/" + userId,
      }),
    {
      onSuccess: (data) => user?.People_I_follow.includes(data?.data.user._id),
    }
  );

  //req profile user product data
  const { data, isLoading, isError } = useQuery(["products", userId], () =>
    axios_instance(true)({
      method: "GET",
      url: "products?seller=" + userId,
    })
  );

  const followQuery = useMutation(
    ["follow"],
    () =>
      axios_instance(true)({
        method: "PATCH",
        url: "users/follow",
        data: { email: profile.data?.data.user.email },
      }),
    {
      onSettled: () => setFollowing(!following),
    }
  );

  return (
    <div className={styles.container}>
      <aside>
        <SidebarFeed />
      </aside>
      <div className={styles.profileWrapper}>
        {openEdit && <EditProfile setShow={setOpenEdit} show={openEdit} />}
        <div className={styles.userDesc}>
          <img src={profile.data?.data.user.profileImg} alt="user" />
          <div className={styles.details}>
            <div className={styles.header}>
              <h2>{profile.data?.data.user.name} </h2>
              {me && (
                <button onClick={() => setOpenEdit(true)}>edit profile</button>
              )}

              {!me && (
                <button onClick={followUser}>
                  {following ? "unfollow" : "follow"}
                  {followQuery.isLoading && (
                    <Facebook color="#1f1f1f" size={20} />
                  )}
                </button>
              )}
              {/* {!me && <button>message</button>} */}
              <button>
                <FiMoreHorizontal />
              </button>
            </div>
            <div className={styles.stats}>
              <p>
                {profile.data?.data.user.People_that_follow_me.length} followers
              </p>
            </div>
            <div className={styles.about}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
              nihil. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Maiores, molestias.
            </div>
            <div className={styles.phoneActions}>
              {!me && (
                <button onClick={followUser}>
                  {following ? "unfollow" : "follow"}
                  {followQuery.isLoading && (
                    <Facebook color="#1f1f1f" size={20} />
                  )}
                </button>
              )}
              {/* {!me && <button>message</button>} */}
              {me && (
                <button onClick={() => setOpenEdit(true)}>edit profile</button>
              )}

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
                      router.replace("/product?id=" + product._id);
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
