"use client";

//Styles
import styles from "./Sidebar.module.scss";
//Icons
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoWallet } from "react-icons/io5";
import { FaCalculator } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className={styles.sidebar}>
      <ul className={`${styles.menu}`}>
        <Link href="/dashboard">
          <li
            className={`${styles.sidebarItem} ${pathname === "/dashboard" ? styles.active : ""}`}
          >
            <TbLayoutDashboardFilled />
            <span className={styles.label}>Dashboard</span>
          </li>
        </Link>
        <Link href="/transactions">
          <li
            className={`${styles.sidebarItem} ${pathname === "/transactions" ? styles.active : ""}`}
          >
            <IoWallet />
            <span className={styles.label}>Transactions</span>
          </li>
        </Link>
        <Link href="/budget-planner">
          <li
            className={`${styles.sidebarItem} ${pathname === "/budget-planner" ? styles.active : ""}`}
          >
            <FaCalculator />
            <span className={styles.label}>Budget planner</span>
          </li>
        </Link>
      </ul>
    </div>
  );
}
