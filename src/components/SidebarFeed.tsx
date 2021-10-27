import React, { ReactElement } from "react";
import {
  faCar,
  faCarBattery,
  faEthernet,
  faPizzaSlice,
  faTshirt,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../styles/sidebarfeed.module.scss";
import { Link } from "react-router-dom";

interface Props {}

const SidebarFeed = (): ReactElement => {
  return (
    <div className={styles.container}>
      <h2>Categories</h2>
      <ul>
        <li>
          <Link to="#">
            <FontAwesomeIcon icon={faCar} /> cars
          </Link>
        </li>
        <li>
          <Link to="#">
            <FontAwesomeIcon icon={faEthernet} />
            electronics
          </Link>
        </li>
        <li>
          <Link to="#">
            <FontAwesomeIcon icon={faCarBattery} />
            boats
          </Link>
        </li>
        <li>
          <Link to="#">
            <FontAwesomeIcon icon={faTshirt} />
            cloths
          </Link>
        </li>
        <li>
          <Link to="#">
            <FontAwesomeIcon icon={faPizzaSlice} />
            food
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarFeed;
