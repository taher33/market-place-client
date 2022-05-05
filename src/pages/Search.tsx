import React from "react";
import { useInfiniteQuery } from "react-query";
import { axios_instance } from "../utils/axios";
import { useSearchCtx } from "../utils/context";
import styles from "../styles/search.module.scss";
import SidebarFeed from "../components/SidebarFeed";
import { Product } from "../utils/types";
import FullPageLoader from "../components/fullPageLoader";
import { useHistory } from "react-router-dom";

type Props = {};

function Search({}: Props) {
  const { search } = useSearchCtx();
  const router = useHistory();

  const { data, status } = useInfiniteQuery(
    ["searchProducts", search],
    async () => {
      const res = await axios_instance()({
        method: "GET",
        url: `products/search?search=${search}`,
      });
      return res.data;
    }
  );
  return (
    <div className={styles.container}>
      <aside>
        <SidebarFeed />
      </aside>
      <main>
        {status === "loading" ? (
          <div style={{ margin: "2rem auto" }}>
            <FullPageLoader />
          </div>
        ) : status === "error" ? (
          <h2 className={styles.errorState}>
            sorry but something went wrong <span>🤕</span> please try reloading
          </h2>
        ) : status === "success" && data?.pages[0].products.length === 0 ? (
          <p style={{ fontSize: "1.2rem" }}>search for something</p>
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
      </main>
    </div>
  );
}

export default Search;
