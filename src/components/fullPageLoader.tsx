import React, { ReactElement } from "react";

import styles from "../styles/pageLoader.module.scss";

interface Props {}

function FullPageLoader({}: Props): ReactElement {
  return (
    <div className={styles.container}>
      <div></div>
    </div>
  );
}

export default FullPageLoader;
