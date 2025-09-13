"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import moment from "moment";

//Icons
import { IoNotifications } from "react-icons/io5";
//Styles
import styles from "./DashboardHeader.module.scss";
//Types
import { UserProfile } from "@/features/user/types/user";
//Utils
import { getUserClient } from "@/features/user/api/getUserClient";
//Components
import UserModal from "@/features/user/components/UserModal";

const DashboardHeader = () => {
  const [user, setUser] = React.useState<UserProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserClient();
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <>
      {isModalOpen && <UserModal onClose={() => setIsModalOpen(false)} />}
      <div className={styles.header}>
        <div className={styles.welcome}>
          <Image
            className={styles.avatar}
            src="https://i.pravatar.cc/150?img=3"
            alt=""
            width={32}
            height={32}
            onClick={() => setIsModalOpen(!isModalOpen)}
          />
          <div className={styles.data}>
            <p className={styles.username}>{user?.username}</p>
            <p className={styles.timestamp}>
              {moment().format("MMMM Do YYYY")}
            </p>
          </div>
        </div>
        <i className={styles.notificationsIcon}>
          <IoNotifications />
          <span className={styles.counter}></span>
        </i>
      </div>
    </>
  );
};

export default DashboardHeader;
