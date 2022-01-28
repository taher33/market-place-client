import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useQuery as useParams } from "../utils/usequery";
import { useQuery } from "react-query";
import Listings from "../components/Listings";
import { axios_instance } from "../utils/axios";

import styles from "../styles/singleProduct.module.scss";
import FullPageLoader from "../components/fullPageLoader";
import { useAppContext } from "../utils/context";
import { useForm } from "react-hook-form";

interface Props {}

interface User {
  profileImg: String;
  People_I_follow: [string];
  People_that_follow_me: [string];
  email: string;
  _id: string;
  name: string;
}

interface Product {
  condition: String;
  saves: number;
  price: number;
  stock: number;
  pictures: [string];
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
  const [btnState, setbtnState] = useState<"error" | "submit" | "loading">(
    "submit"
  );
  const query = useParams();
  const id = query.get("id");
  const { data, isLoading, isError } = useQuery(["product", id], () =>
    axios_instance(true)({
      method: "GET",
      url: "/products/singleProduct?_id=" + id,
    })
  );
  const product = data?.data.product as Product;

  const submitMessage = (data: Form) => {
    setbtnState("loading");
    const payload = {
      sender: user?._id,
      content: data.content,
      reciever: product.seller._id,
    };
    socket?.emit("new private message", payload, (status: string) => {
      if (status === "success") setbtnState("submit");
      else setbtnState("error");
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
        <img src={product.pictures[0]} alt="product" />
        <div className={styles.textWrapper}>
          <h2>{product.description} </h2>
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
            <span>see profile</span>
          </div>
          <div className={styles.user}>
            <img src="/delivery.png" alt="user" />
            <p>{product.seller.name}</p>
            <span>follow</span>
          </div>
          <p className={styles.dateSince}>has been a seeler since 2065</p>
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
            {product.details && (
              <>
                <h5>description</h5>
                <p>{product.details}</p>
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
