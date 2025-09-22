import React from "react";
//Icons
import { IoNotifications } from "react-icons/io5";
//Styles
import styles from "./DashboardHeader.module.scss";
//Types
import { UserProfile } from "@/features/user/types/user";
//Utils
import { getUserServer } from "@/features/user/api/getUserServer";
//Components
import UserProfileCard from "@/features/user/components/UserProfileCard";

const DashboardHeader = async () => {
  const { user, error } = (await getUserServer()) as {
    user: UserProfile | null;
    error: string | null;
  };

  return (
    <>
      <div className={styles.header}>
        {user && !error ? (
          <UserProfileCard user={user} />
        ) : (
          <p>Failed to load user profile.</p>
        )}
        <i className={styles.notificationsIcon}>
          <IoNotifications />
          <span className={styles.counter}></span>
        </i>
      </div>
    </>
  );
};

export default DashboardHeader;
