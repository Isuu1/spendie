"use client";

//Styles
import styles from "./Sidebar.module.scss";
//Icons
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoWallet } from "react-icons/io5";
import { FaCalculator } from "react-icons/fa6";

export default function Sidebar() {
  const pathname = window.location.pathname;

  return (
    <div className={styles.sidebar}>
      <ul className={`${styles.menu}`}>
        <li
          className={`${styles.sidebarItem} ${pathname === "/dashboard" ? styles.active : ""}`}
        >
          <TbLayoutDashboardFilled />
          <span className={styles.label}>Dashboard</span>
        </li>
        <li className={styles.sidebarItem}>
          <IoWallet />
          <span className={styles.label}>Transactions</span>
        </li>
        <li className={styles.sidebarItem}>
          <FaCalculator />
          <span className={styles.label}>Budget planner</span>
        </li>
      </ul>
    </div>
  );
}
