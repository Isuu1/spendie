import React from "react";

//Styles
import styles from "./DashboardLayoutWrapper.module.scss";
//Components
import Sidebar from "../components/Sidebar";

const DashboardLayoutWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />
      <div className={styles.innerWrapper}>{children}</div>
    </div>
  );
};

export default DashboardLayoutWrapper;
