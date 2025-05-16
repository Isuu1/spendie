"use client";

//Styles
import styles from "./Sidebar.module.scss";

//Icons
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { BsWalletFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { useState } from "react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  console.log("isCollapsed", isCollapsed);

  return (
    <div
      className={styles.sidebar}
      onMouseEnter={() => setIsCollapsed(true)}
      onMouseLeave={() => setIsCollapsed(false)}
    >
      <ul className={styles.menu}>
        <li className={styles.sidebarItem}>
          <TbLayoutDashboardFilled />
          {/* <span className={styles.label}>Dashboard</span> */}
        </li>
        <li className={styles.sidebarItem}>
          <BsWalletFill />
          {/* <span className={styles.label}>Dashboard</span> */}
        </li>
        <li className={styles.sidebarItem}>
          <IoSettings />
          {/* <span className={styles.label}>Dashboard</span> */}
        </li>
        <li className={styles.sidebarItem}>
          <MdManageAccounts />
          {/* <span className={styles.label}>Dashboard</span> */}
        </li>
      </ul>
    </div>
  );
}
