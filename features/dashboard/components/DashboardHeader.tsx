"use client";

//import { user } from "@/data/user";
import Image from "next/image";
import React, { useEffect } from "react";

//Icons
import { IoNotifications } from "react-icons/io5";
//Styles
import styles from "./DashboardHeader.module.scss";
//Types
import { UserProfile } from "@/features/user/types/user";
//Utils
import { getUserClient } from "@/features/user/api/getUserClient";

const DashboardHeader = () => {
  const [user, setUser] = React.useState<UserProfile | null>(null);

  useEffect(() => {
    console.log("Fetching user profile...");
    const fetchUser = async () => {
      const user = await getUserClient();
      setUser(user);
      console.log("Fetched user profile:", user);
    };

    fetchUser();
  }, []);

  return (
    <div className={styles.header}>
      <p className={styles.welcomeMessage}>Welcome, {user?.username}</p>
      <Image
        className={styles.avatar}
        src="https://i.pravatar.cc/150?img=3"
        alt=""
        width={27}
        height={27}
      />
      <i className={styles.notificationsIcon}>
        <IoNotifications />
        <span className={styles.counter}></span>
      </i>
    </div>
  );
};

export default DashboardHeader;
