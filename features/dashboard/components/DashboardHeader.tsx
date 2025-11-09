import React from "react";
//Icons
import { IoNotifications } from "react-icons/io5";
//Styles
import styles from "./DashboardHeader.module.scss";
//Utils
import { getUserServer } from "@/features/user/api/getUserServer";
//Components
import UserProfileCard from "@/features/user/components/UserProfileCard";
import DashboardPanelsControls from "./DashboardPanelsControls";
//Api
import { getUserSettingsServer } from "@/features/user/api/getUserSettingsServer";

const DashboardHeader = async () => {
  const { user, error: userError } = await getUserServer();
  const { settings, error: settingsError } = await getUserSettingsServer();

  return (
    <>
      <div className={styles.header}>
        {user && !userError && <UserProfileCard user={user} />}
        {settings && !settingsError && <DashboardPanelsControls />}
        <i className={styles.notificationsIcon}>
          <IoNotifications />
          <span className={styles.counter}></span>
        </i>
      </div>
    </>
  );
};

export default DashboardHeader;
