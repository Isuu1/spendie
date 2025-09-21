"use client";

import React from "react";
import { usePathname } from "next/navigation";
//Styles
import styles from "./DashboardLayoutWrapper.module.scss";

type DashboardLayoutWrapperProps = {
  children: React.ReactNode;
  header: React.ReactNode;
  sidebar: React.ReactNode;
};

const DashboardLayoutWrapper: React.FC<DashboardLayoutWrapperProps> = ({
  children,
  header,
  sidebar,
}) => {
  const pathname = usePathname();
  return (
    <div className={`${styles.layout} `}>
      {header}
      {sidebar}
      <div
        className={`${styles.innerWrapper} ${pathname === "/dashboard" ? styles.dashboardLayout : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayoutWrapper;
