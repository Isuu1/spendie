import React from "react";

//Styles
import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <span className={styles.spinner}></span>
    </div>
  );
};

export default Loading;
