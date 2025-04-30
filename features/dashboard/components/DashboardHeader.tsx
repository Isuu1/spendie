import { user } from "@/data/user";
import Image from "next/image";
import React from "react";

//Icons
import { IoNotifications } from "react-icons/io5";
//Styles
import styles from "./DashboardHeader.module.scss";

const DashboardHeader = () => {
  return (
    <div className={styles.header}>
      <IoNotifications />
      <Image
        className={styles.avatar}
        src={user.avatar}
        alt=""
        width={40}
        height={40}
      />
    </div>
  );
};

export default DashboardHeader;
