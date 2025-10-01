import React from "react";
//Styles
import styles from "./DashboardLoading.module.scss";

const Loading = () => {
  return (
    <div className={styles.dashboard}>
      {[...Array(6)].map((_, i) => (
        <div key={i} className={styles.panel}>
          <div className={styles.header}>
            <div className={styles.panelName}></div>
            <div className={styles.panelIcon}></div>
          </div>

          <div className={styles.body}></div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
