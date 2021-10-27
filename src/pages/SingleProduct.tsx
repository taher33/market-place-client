import React, { ReactElement, useEffect, useRef, useState } from "react";
import useQuery from "../utils/usequery";
import Listings from "../components/Listings";

import styles from "../styles/singleProduct.module.scss";

interface Props {}

function SingleProduct({}: Props): ReactElement {
  const [loading, setloading] = useState(false);
  const query = useQuery();
  const id = query.get("id");
  const myref = useRef(null);

  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 1000);
    if (myref) {
      let scrol = myref.current as any;
      // scrol.scrollIntoView();
    }
  }, [id]);
  // if (loading) return <h1>loading ...</h1>;
  return (
    <div className={styles.container}>
      <div className={styles.productWrapper}>
        <img ref={myref} src="/product.jpg" alt="product" />
        <div className={styles.textWrapper}>
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h2>
          <h3>89 USD</h3>
          <p>send a message to the seller</p>
          <form>
            <input
              type="text"
              name="message"
              defaultValue="is this still available ?"
            />
            <button type="submit">send</button>
          </form>
          <div className={styles.sellerInfo}>
            <h4>info about the seller </h4>
            <span>see profile</span>
          </div>
          <div className={styles.user}>
            <img src="/delivery.png" alt="user" />
            <p>john doe</p>
            <span>follow</span>
          </div>
          <p className={styles.dateSince}>has been a seeler since 2065</p>
          <h4>Details</h4>
          <div className={styles.detail}>
            <h5>condition</h5>
            <p>good as new</p>
          </div>
          <div className={styles.detail}>
            <h5>description</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              et mattis non sed tristique nisi. In faucibus donec phasellus sit
              sed nam odio.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.featured}>
        {/* <h2>similar products</h2> */}
        <Listings name="featured products" />
      </div>
    </div>
  );
}

export default SingleProduct;
