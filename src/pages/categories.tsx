import React, { ReactElement, useState } from "react";
import { useQuery } from "react-query";
import { useQuery as getQueryParams } from "../utils/usequery";
import { Link, useHistory } from "react-router-dom";
import SidebarFeed from "../components/SidebarFeed";

import styles from "../styles/categories.module.scss";
import { axios_instance } from "../utils/axios";
import { Product } from "../utils/types";
import FullPageLoader from "../components/fullPageLoader";
import { useForm } from "react-hook-form";

interface Props {}

function Categories({}: Props): ReactElement {
  const router = useHistory();
  const query = getQueryParams().toString();
  const { register, watch } = useForm();
  const select = watch("select");

  const { data, isLoading, isError } = useQuery(
    ["products", query.toString(), select],
    () =>
      axios_instance(true)({
        method: "GET",
        url: "products?" + select + "=true" + query,
      })
  );
  return (
    <div className={styles.container}>
      <aside>
        <SidebarFeed />
      </aside>
      <main>
        <div className={styles.options}>
          <div className={styles.dropDown}>
            <select {...register("select")}>
              <option value="following">following</option>
              <option value="new">new</option>
              <option value="popular">popular</option>
            </select>
          </div>
          <div className={styles.categories}>
            <Link to="/categories">all</Link>
            <Link to="?categorie=cloths">cloths</Link>
            <Link to="?categorie=beauty">beauty</Link>
            <Link to="?categorie=sports">sports</Link>
            <Link to="?categorie=games">games</Link>
          </div>
        </div>
        {isLoading ? (
          <div className={styles.loader}>
            <FullPageLoader />
          </div>
        ) : isError ? (
          <h2 className={styles.errorState}>
            sorry but something went wrong <span>🤕</span> please try reloading
          </h2>
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
      </main>
    </div>
  );
}

export default Categories;
