import React, { ReactElement, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useQuery as getQueryParams } from "../utils/usequery";
import { Link, useHistory } from "react-router-dom";
import SidebarFeed from "../components/SidebarFeed";

import styles from "../styles/categories.module.scss";
import { axios_instance } from "../utils/axios";
import { Product } from "../utils/types";
import FullPageLoader from "../components/fullPageLoader";
import useIntersectionObserver from "../hooks/intersectionObs";
import { useForm } from "react-hook-form";

interface Props {}

function Categories({}: Props): ReactElement {
  const router = useHistory();
  const { register, watch } = useForm();

  const query = getQueryParams().toString();

  const select = watch("select");
  const sort = watch("sort");

  const fetchProjects = async ({ pageParam = 1 }) => {
    console.log(pageParam);
    const res = await axios_instance(true)({
      url:
        "products?" +
        select +
        "=true&" +
        query +
        "&sort=" +
        sort +
        "&page=" +
        pageParam,

      method: "GET",
    });
    return res.data;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ["products", query.toString(), select, sort],
    fetchProjects,
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextPage,
    }
  );
  const loadMoreButtonRef = React.useRef(null);

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: () => fetchNextPage(),
    enabled: !!hasNextPage,
  });

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
            <Link to="?categorie=automobile">automobile</Link>
          </div>
          <div className={styles.sort}>
            <span>sort by :</span>
            <select {...register("sort")}>
              <option value="price">price</option>
              <option value="rating">rating</option>
            </select>
          </div>
        </div>
        {status === "loading" ? (
          <div className={styles.loader}>
            <FullPageLoader />
          </div>
        ) : status === "error" ? (
          <h2 className={styles.errorState}>
            sorry but something went wrong <span>🤕</span> please try reloading
          </h2>
        ) : (
          <div className={styles.listings}>
            {data?.pages.map((group) => {
              return group?.products.map(
                (product: Product, index: number, array: any[]) => {
                  return (
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
                  );
                }
              );
            })}
          </div>
        )}
        <div style={{ height: "20px" }} ref={loadMoreButtonRef}></div>
        {isFetchingNextPage && (
          <div className={styles.loader}>
            <FullPageLoader />
          </div>
        )}
      </main>
    </div>
  );
}

export default Categories;
