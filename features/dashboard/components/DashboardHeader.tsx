import React from "react";
//Icons
import { IoNotifications } from "react-icons/io5";
//Styles
import styles from "./DashboardHeader.module.scss";
//Utils
import { getUserServer } from "@/features/user/api/getUserServer";
//Components
import UserProfileCard from "@/features/user/components/UserProfileCard";

const DashboardHeader = async () => {
  const { user, error: userError } = await getUserServer();

  return (
    <>
      <div className={styles.header}>
        {user && !userError && <UserProfileCard user={user} />}
        <i className={styles.notificationsIcon}>
          <IoNotifications />
          <span className={styles.counter}></span>
        </i>
      </div>
    </>
  );
};

export default DashboardHeader;
