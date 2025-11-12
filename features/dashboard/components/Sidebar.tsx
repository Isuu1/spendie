"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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
import clsx from "clsx";
//import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import Switcher from "@/shared/components/ui/Switcher";

export default function Sidebar() {
  const [signoutClicked, setSignoutClicked] = useState(false);

  const [collapsed, setCollapsed] = useState(true);

  const pathname = usePathname();

  const router = useRouter();

  const supabase = createClient();

  const sidebarItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <TbLayoutDashboardFilled />,
    },
    { name: "Transactions", href: "/transactions", icon: <IoWallet /> },
    { name: "Budget planner", href: "/budget-planner", icon: <FaCalculator /> },
    {
      name: "Recurring payments",
      href: "/recurring-payments",
      icon: <FaRepeat />,
    },
    { name: "Settings", href: "/user/account-settings", icon: <IoSettings /> },
  ];

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out. Please try again.", toastStyle);
    }
    router.push("/");
  };

  const handleSidebarToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={clsx(styles.sidebar, collapsed ? "" : styles.expanded)}>
      <ul className={styles.menu}>
        {sidebarItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`${styles.item} ${pathname === item.href ? styles.active : ""}`}
            >
              {item.icon}
              <span className={styles.label}>{item.name}</span>
            </Link>
          </li>
        ))}
        {/* 
        <li
          className={clsx(styles.sidebarSwitch, [
            { [styles.expanded]: !collapsed },
          ])}
        >
          <span
            className={clsx(styles.panelStatus, [
              // { [styles.pending]: isPending },
              { [styles.active]: !collapsed },
              { [styles.inactive]: collapsed },
            ])}
            onClick={() => handleSidebarToggle()}
          >
            <motion.span
              className={styles.indicator}
              initial={false}
              animate={{
                x: collapsed ? "0%" : "100%",
              }}
            />
          </span>
          <span className={styles.label}>
            {collapsed ? "Pin Sidebar" : "Unpin Sidebar"}
          </span>
        </li> */}
        <Switcher
          value={collapsed}
          onChange={handleSidebarToggle}
          label={collapsed ? "Pin Sidebar" : "Unpin Sidebar"}
        />

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
