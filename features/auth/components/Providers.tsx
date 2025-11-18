import React from "react";
//Styles
import styles from "./Providers.module.scss";
//Icons
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";

const Providers = () => {
  return (
    <div className={styles.providersContainer}>
      <p className={styles.loginOptions}>OR</p>
      <div className={styles.providers}>
        <div className={styles.provider}>
          <FcGoogle />
        </div>
        <div className={styles.provider}>
          <BsApple />
        </div>
      </div>
    </div>
  );
};

export default Providers;
