"use client";

import React from "react";
//Icons
import { IoNotifications } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
//Styles
import styles from "./DashboardHeader.module.scss";
//Components
import UserProfileCard from "@/features/user/components/UserProfileCard";
import clsx from "clsx";

const DashboardHeader = () => {
  return (
    <>
      <div className={styles.header}>
        <i className={clsx(styles.icon, styles.menuIcon)}>
          <TiThMenu />
        </i>
        <i className={clsx(styles.icon, styles.notificationsIcon)}>
          <IoNotifications />
          <span className={styles.counter}></span>
        </i>
        <UserProfileCard />
      </div>
    </>
  );
};

export default DashboardHeader;
