"use client";

//Styles
import styles from "./Sidebar.module.scss";

//Icons
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { BsWalletFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
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
