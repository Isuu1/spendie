"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
//Icons
import { IoNotifications } from "react-icons/io5";
import { RiArrowDownSLine } from "react-icons/ri";
//Styles
import styles from "./DashboardHeader.module.scss";
//Types
import { UserProfile } from "@/features/user/types/user";
//Utils
import { getUserClient } from "@/features/user/api/getUserClient";
//Components
import UserModal from "@/features/user/components/UserModal";

const DashboardHeader = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <div
          className={styles.userProfile}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <AnimatePresence>
            {isModalOpen && (
              <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            )}
          </AnimatePresence>

          <Image
            className={styles.avatar}
            src="https://i.pravatar.cc/150?img=3"
            alt=""
            width={32}
            height={32}
          />
          <p className={styles.name}>
            {user?.name} {user?.surname}
          </p>
          <div className={styles.icon}>
            <RiArrowDownSLine />
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
