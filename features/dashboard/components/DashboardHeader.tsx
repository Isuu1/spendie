import React from "react";
//Icons
import { IoNotifications } from "react-icons/io5";
//Styles
import styles from "./DashboardHeader.module.scss";
//Types
//import { UserProfile } from "@/features/user/types/user";
//Utils
import { getUserServer } from "@/features/user/api/getUserServer";
//Components
import UserProfileCard from "@/features/user/components/UserProfileCard";
import { getUserSettingsServer } from "@/features/user/api/getUserSettingsServer";
import DashboardPanelsControls from "./DashboardPanelsControls";
import ErrorMessage from "@/shared/components/ErrorMessage";

const DashboardHeader = async () => {
  // const { user, error } = (await getUserServer()) as {
  //   user: UserProfile | null;
  //   error: string | null;
  // };
  const { user, error: userError } = await getUserServer();
  const { settings, error: settingsError } = await getUserSettingsServer();

  if (userError || settingsError) {
    return (
      <div className={styles.header}>
        <ErrorMessage message="Failed to load user settings." />
      </div>
    );
  }

  return (
    <>
      <div className={styles.header}>
        {user ? (
          <UserProfileCard user={user} />
        ) : (
          <p>Failed to load user profile.</p>
        )}
        <DashboardPanelsControls settings={settings} />
        <i className={styles.notificationsIcon}>
          <IoNotifications />
          <span className={styles.counter}></span>
        </i>
      </div>
    </>
  );
};

export default DashboardHeader;
