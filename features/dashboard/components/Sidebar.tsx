"use client";
import { useState } from "react";

//Styles
import styles from "./Sidebar.module.scss";

//Icons
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { BsWalletFill } from "react-icons/bs";
import { FaCalculator } from "react-icons/fa6";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  console.log("isCollapsed", isCollapsed);

  return (
    <div
      className={styles.sidebar}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <ul className={`${styles.menu}`}>
        <li className={styles.sidebarItem}>
          <TbLayoutDashboardFilled />
          {!isCollapsed && <span className={styles.label}>Dashboard</span>}
        </li>
        <li className={styles.sidebarItem}>
          <BsWalletFill />
          {!isCollapsed && <span className={styles.label}>Transactions</span>}
        </li>
        <li className={styles.sidebarItem}>
          <FaCalculator />
          {!isCollapsed && <span className={styles.label}>Budget planner</span>}
        </li>
      </ul>
    </div>
  );
}
