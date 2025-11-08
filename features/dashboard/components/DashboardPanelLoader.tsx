import React from "react";
//Styles
import styles from "./DashboardPanelLoader.module.scss";

interface DashboardPanelLoaderProps {
  height?: string | number;
}

const DashboardPanelLoader: React.FC<DashboardPanelLoaderProps> = ({
  height,
}) => {
  return (
    <div className={styles.loader} style={{ height: `${height}px` }}></div>
  );
};

export default DashboardPanelLoader;
