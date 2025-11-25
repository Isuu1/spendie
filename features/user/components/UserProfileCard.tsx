"use client";

import Image from "next/image";
import React from "react";

import styles from "./UserProfileCard.module.scss";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { useUserClient } from "../hooks/useUserClient";
import { AnimatePresence } from "motion/react";
import Link from "next/link";
import { motion } from "motion/react";

const userMenuVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const UserProfileCard: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const { data: user, error } = useUserClient();

  console.log("UserProfileCard user:", user, "error:", error);

  if (error) {
    return <div className={styles.userProfile}>Error loading user data</div>;
  }

  const avatarUrl = user?.avatar;

  return (
    <div
      className={`${styles.userProfileContainer} ${menuOpen ? styles.expanded : ""}`}
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <div className={styles.profile}>
        <div className={styles.imageWrapper}>
          <Image
            className={styles.avatar}
            src={avatarUrl || "https://i.pravatar.cc/150?img=3"}
            alt=""
            width={30}
            height={30}
          />
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            className={styles.menu}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={userMenuVariants}
            transition={{ duration: 0.15 }}
          >
            <Link href="/user/account-details">
              <li className={styles.item}>
                <FaUser />
                <span>Account details</span>
              </li>
            </Link>
            <Link href="/user/settings">
              <li className={styles.item}>
                <IoSettings />
                <span>Settings</span>
              </li>
            </Link>
            <li className={styles.item}>
              <FaSignOutAlt />
              <span>Logout</span>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfileCard;
