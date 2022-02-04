import React, { ReactElement } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../styles/listings.module.scss";
import { useQuery } from "react-query";
import { axios_instance } from "../utils/axios";
import FullPageLoader from "./fullPageLoader";
import { Product } from "../utils/types";

interface Props {
  name: String;
  seeMore?: boolean;
  query?: string;
}

function Listings({ name, seeMore, query }: Props): ReactElement {
  const router = useHistory();
  if (!query) query = "";
  const { data, isError, isLoading } = useQuery(["products", name], () =>
    axios_instance(true)({
      method: "GET",
      url: "/products" + query,
    })
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>{name}</h1>
        <Link to="#">{seeMore && <span>see all</span>}</Link>
      </div>
      <div className={styles.itemsWrapper}>
        {isLoading ? (
          <div className={styles.loader}>
            <FullPageLoader />
          </div>
        ) : isError ? (
          <h2 className={styles.errorState}>
            sorry but something went wrong <span>🤕</span> please try reloading
          </h2>
        ) : data?.data.products.length === 0 && !isLoading ? (
          <p style={{ fontSize: "1.2rem" }}>
            sorry but this section seems to be empty
          </p>
        ) : (
          data?.data.products.map((product: Product) => (
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
          ))
        )}
      </div>
    </div>
  );
}

export default Listings;
