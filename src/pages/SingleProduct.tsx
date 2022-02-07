import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useQuery as useParams } from "../utils/usequery";
import { useMutation, useQuery } from "react-query";
import Listings from "../components/Listings";
import { axios_instance } from "../utils/axios";

import styles from "../styles/singleProduct.module.scss";
import FullPageLoader from "../components/fullPageLoader";
import { useAppContext } from "../utils/context";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { User } from "../utils/types";
import { Facebook } from "react-spinners-css";

interface Props {}

interface Product {
  condition: String;
  title: String;
  saves: number;
  price: number;
  stock: number;
  pictures: string[];
  createdAt: string;
  rating: number;
  _id: string;
  description: string;
  seller: User;
  categorie: string;
  details: string;
  modifiedAt: string;
}
interface Form {
  content: string;
}

function SingleProduct({}: Props): ReactElement {
  const { socket, user } = useAppContext();
  const { register, handleSubmit } = useForm<Form>();
  const [index, setIndex] = useState(0);
  const [following, setFollowing] = useState<boolean>(false);
  const [btnState, setbtnState] = useState<"error" | "submit" | "loading">(
    "submit"
  );

  const query = useParams();
  const id = query.get("id");

  const { data, isLoading, isError } = useQuery(
    ["product", id],
    () =>
      axios_instance(true)({
        method: "GET",
        url: "/products/singleProduct?_id=" + id,
      }),
    {
      onSuccess: (data) =>
        user?.People_I_follow.includes(data?.data.product.seller._id),
    }
  );
  const product = data?.data.product as Product;

  const slide = (id: number) => {
    setIndex(id);
  };

  const followUser = async () => {
    followQuery.mutate();
  };

  const followQuery = useMutation(
    ["follow"],
    () =>
      axios_instance(true)({
        method: "PATCH",
        url: "users/follow",
        data: { email: product.seller.email },
      }),
    {
      onSettled: () => setFollowing(!following),
    }
  );

  const submitMessage = (data: Form) => {
    setbtnState("loading");
    const payload = {
      sender: user?._id,
      content: data.content,
      reciever: product.seller._id,
      productId: product._id,
    };

    socket?.emit("new private message", payload, ({ status, error }: any) => {
      if (status === "success") setbtnState("submit");
      else setbtnState("error");
      console.log(error);
    });
  };

  if (isLoading)
    return (
      <div className={styles.loader}>
        <FullPageLoader />
      </div>
    );
  if (isError) return <h2 style={{ color: "red" }}>error</h2>;
  return (
    <div className={styles.container}>
      <div className={styles.productWrapper}>
        <div className={styles.imageSlider}>
          <img src={product.pictures[index]} alt="product" />
          <div className={styles.btns}>
            {product.pictures.map((el, id) => (
              <pre
                key={id}
                className={index === id ? styles.selected : ""}
                id={"" + id}
                onClick={() => slide(id)}
              />
            ))}
          </div>
        </div>

        <div className={styles.textWrapper}>
          <h2>{product.title} </h2>
          <h3>{product.price} USD</h3>
          {product.seller._id !== user?._id && (
            <>
              <p>send a message to the seller</p>
              <form onSubmit={handleSubmit(submitMessage)}>
                <input
                  type="text"
                  defaultValue="is this still available ?"
                  {...register("content")}
                />
                <button type="submit" disabled={btnState === "loading"}>
                  {btnState === "submit"
                    ? "send"
                    : btnState === "loading"
                    ? "submitting"
                    : "error"}
                </button>
              </form>
            </>
          )}
          <div className={styles.sellerInfo}>
            <h4>info about the seller </h4>
            <Link to={"profile?id=" + product.seller._id}>
              <span>see profile</span>
            </Link>
          </div>
          <div className={styles.user}>
            <img src={product.seller.profileImg} alt="user" />
            <p>{product.seller.name}</p>
            <button
              onClick={followUser}
              disabled={
                followQuery.isLoading || user?._id === product.seller._id
              }
            >
              {following ? "unfollow" : "follow"}
              {followQuery.isLoading && <Facebook color="#1d81de" size={20} />}
            </button>
          </div>
          {/* <p className={styles.dateSince}>has been a seeler since 2065</p> */}
          <h4>Details</h4>
          <div className={styles.detail}>
            {product.condition && (
              <>
                <h5>condition</h5>
                <p>{product.condition}</p>
              </>
            )}
          </div>
          <div className={styles.detail}>
            {product.description && (
              <>
                <h5>description</h5>
                <p>{product.description}</p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.featured}>
        <Listings name="featured products" />
      </div>
    </div>
  );
}

export default SingleProduct;
