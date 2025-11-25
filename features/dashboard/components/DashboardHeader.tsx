"use client";

import React from "react";
//Icons
import { IoNotifications } from "react-icons/io5";
//Styles
import styles from "./DashboardHeader.module.scss";
//Components
import UserProfileCard from "@/features/user/components/UserProfileCard";

const DashboardHeader = () => {
  return (
    <>
      <div className={styles.header}>
        <i className={styles.notificationsIcon}>
          <IoNotifications />
          <span className={styles.counter}></span>
        </i>
        <UserProfileCard />
      </div>
    </>
  );
};

export default DashboardHeader;
