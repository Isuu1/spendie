import React from "react";
//Icons
import { IoNotifications } from "react-icons/io5";
//Styles
import styles from "./DashboardHeader.module.scss";
//Components
import UserProfileCard from "@/features/user/components/UserProfileCard";

const DashboardHeader = async () => {
  return (
    <>
      <div className={styles.header}>
        <UserProfileCard />
        <i className={styles.notificationsIcon}>
          <IoNotifications />
          <span className={styles.counter}></span>
        </i>
      </div>
    </>
  );
};

export default DashboardHeader;
