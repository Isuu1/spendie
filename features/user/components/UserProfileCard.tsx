"use client";

import Image from "next/image";
import React from "react";

import styles from "./UserProfileCard.module.scss";
import { RiArrowDownSLine } from "react-icons/ri";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { useUserClient } from "../hooks/useUserClient";

const UserProfileCard: React.FC = () => {
  const [expanded, setExpanded] = React.useState(false);

  const { data: user, error } = useUserClient();

  if (error) {
    return <div className={styles.userProfile}>Error loading user data</div>;
  }

  return (
    <div
      className={`${styles.userProfile} ${expanded ? styles.expanded : ""}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className={styles.collapsed}>
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
      <ul className={styles.userProfileMenu}>
        <li
          className={styles.item}
          //onClick={() => handleMenuItemClick("/user/account-details")}
        >
          <FaUser />
          <span>Account details</span>
        </li>
        <li
          className={styles.item}
          //onClick={() => handleMenuItemClick("/user/account-settings")}
        >
          <IoSettings />
          <span>Settings</span>
        </li>
        <li className={styles.item}>
          <FaSignOutAlt />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default UserProfileCard;
