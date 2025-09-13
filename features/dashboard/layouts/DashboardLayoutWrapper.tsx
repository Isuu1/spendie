import React from "react";

//Styles
import styles from "./DashboardLayoutWrapper.module.scss";

const DashboardLayoutWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className={styles.dashboardLayout}>{children}</div>;
};

export default DashboardLayoutWrapper;
