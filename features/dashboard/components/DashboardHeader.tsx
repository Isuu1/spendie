"use client";

import React, { useEffect, useState } from "react";
//Icons
import { IoNotifications } from "react-icons/io5";
//Styles
import styles from "./DashboardHeader.module.scss";
//Types
import { UserProfile } from "@/features/user/types/user";
//Utils
import { getUserClient } from "@/features/user/api/getUserClient";
//Components
import UserProfileCard from "@/features/user/components/UserProfileCard";

const DashboardHeader = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { user, error } = await getUserClient();
      if (error) {
        console.error("Error fetching user in DashboardHeader:", error);
        return;
      }
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <>
      <div className={styles.header}>
        <UserProfileCard user={user} />
        <i className={styles.notificationsIcon}>
          <IoNotifications />
          <span className={styles.counter}></span>
        </i>
      </div>
    </>
  );
};

export default DashboardHeader;
