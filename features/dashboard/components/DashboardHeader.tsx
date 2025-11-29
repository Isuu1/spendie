"use client";

import React, { useState } from "react";
import clsx from "clsx";
//Icons
import { IoNotifications } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
//Styles
import styles from "./DashboardHeader.module.scss";
//Components
import UserProfileCard from "@/features/user/components/UserProfileCard";
import MobileSidebar from "./MobileSidebar";
//Animations
import { AnimatePresence } from "motion/react";

const DashboardHeader = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {mobileSidebarOpen && (
          <MobileSidebar onClose={() => setMobileSidebarOpen(false)} />
        )}
      </AnimatePresence>
      <div className={styles.header}>
        <i
          className={clsx(styles.icon, styles.menuIcon)}
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        >
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
