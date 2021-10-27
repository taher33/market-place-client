import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

import styles from "../styles/signup.module.scss";

interface Props {}

function Signup({}: Props): ReactElement {
  return (
    <div className={styles.container}>
      <div>
        <h2>Get Started</h2>
        <p>
          and get access to millions of clients -or-{"   "}
          <Link to="/login">Login</Link>
        </p>
        <form>
          <label htmlFor="name">
            Name
            <input type="text" name="name" />
          </label>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <button type="submit">Sign up</button>
        </form>
      </div>
      <img src="Delivery.png" alt="delivery" />
    </div>
  );
}

export default Signup;
