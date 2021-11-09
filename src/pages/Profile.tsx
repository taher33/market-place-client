import React, { ReactElement } from "react";

import styles from "../styles/profile.module.scss";

interface Props {}

function Profile({}: Props): ReactElement {
  return <div className={styles.container}></div>;
}

export default Profile;
