import React, { ReactElement } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../styles/listings.module.scss";
import { useQuery } from "react-query";
import { axios_instance } from "../utils/axios";

interface Props {
  name: String;
  seeMore?: boolean;
}

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

function Listings({ name, seeMore }: Props): ReactElement {
  const router = useHistory();

  const { data } = useQuery("products", () =>
    axios_instance(true)({
      method: "GET",
      url: "/products?categorie=cloths",
    })
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>{name}</h1>
        <Link to="#">{seeMore && <span>see all</span>}</Link>
      </div>
      <div className={styles.itemsWrapper}>
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
    </div>
  );
}

export default Listings;
