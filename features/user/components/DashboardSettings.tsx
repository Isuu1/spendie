"use client";

import React from "react";
//Styles
import styles from "./DashboardSettings.module.scss";
import DashboardPanelsMenu from "@/features/dashboard/components/DashboardPanelsMenu";

const DashboardSettings = () => {
  return (
    <div className={styles.dashboardSettings}>
      <h3>Dashboard panels</h3>
      <DashboardPanelsMenu onClose={() => {}} />
    </div>
  );
};

export default DashboardSettings;
