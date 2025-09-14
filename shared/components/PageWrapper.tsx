import React from "react";

//Styles
import styles from "./PageWrapper.module.scss";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.page}>
      <div className={styles.backgroundShape}></div>
      {children}
    </div>
  );
};

export default PageWrapper;
