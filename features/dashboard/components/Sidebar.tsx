"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

//Styles
import styles from "./Sidebar.module.scss";
//Icons
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoWallet } from "react-icons/io5";
import { FaCalculator } from "react-icons/fa6";
import { FaRepeat } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import { createClient } from "@/supabase/client";
import { useState } from "react";
import ConfirmAction from "@/shared/components/ConfirmAction";
import toast from "react-hot-toast";
import { toastStyle } from "@/shared/styles/toastStyle";
import { AnimatePresence } from "motion/react";

export default function Sidebar() {
  const [signoutClicked, setSignoutClicked] = useState(false);

  const pathname = usePathname();

  const supabase = createClient();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out. Please try again.", toastStyle);
    }
  };

  return (
    <div className={`${styles.sidebar}`}>
      <ul className={styles.menu}>
        <li>
          <Link
            href="/dashboard"
            className={`${styles.item} ${pathname === "/dashboard" ? styles.active : ""}`}
          >
            <TbLayoutDashboardFilled />
            <span className={styles.label}>Dashboard</span>
          </Link>
        </li>

        <li>
          <Link
            href="/transactions"
            className={`${styles.item} ${pathname === "/transactions" ? styles.active : ""}`}
          >
            <IoWallet />
            <span className={styles.label}>Transactions</span>
          </Link>
        </li>

        <li>
          <Link
            href="/budget-planner"
            className={`${styles.item} ${pathname === "/budget-planner" ? styles.active : ""}`}
          >
            <FaCalculator />
            <span className={styles.label}>Budget planner</span>
          </Link>
        </li>

        <li>
          <Link
            href="/recurring-payments"
            className={`${styles.item} ${pathname === "/recurring-payments" ? styles.active : ""}`}
          >
            <FaRepeat />
            <span className={styles.label}>Recurring payments</span>
          </Link>
        </li>

        <li className={styles.settings}>
          <Link
            href="/user/account-settings"
            className={`${styles.item} ${pathname === "/user/account-settings" ? styles.active : ""}`}
          >
            <IoSettings />
            <span className={styles.label}>Settings</span>
          </Link>
        </li>

        <li
          className={`${styles.item} ${styles.logout}`}
          onClick={() => setSignoutClicked(true)}
        >
          <FaSignOutAlt />
          <span className={styles.label}>Logout</span>
        </li>
      </ul>
      <AnimatePresence>
        {signoutClicked && (
          <ConfirmAction
            message="Are you sure you want to sign out?"
            onCancel={() => setSignoutClicked(false)}
            onConfirm={handleSignOut}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
