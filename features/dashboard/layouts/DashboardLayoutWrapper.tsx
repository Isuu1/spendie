"use client";

import React from "react";

//Styles
import styles from "./DashboardLayoutWrapper.module.scss";
import { usePathname } from "next/navigation";

const DashboardLayoutWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  return pathname === "/dashboard" ? (
    <div className={styles.dashboardLayout}>{children}</div>
  ) : (
    <div className={styles.pageLayout}>{children}</div>
  );
};

export default DashboardLayoutWrapper;
