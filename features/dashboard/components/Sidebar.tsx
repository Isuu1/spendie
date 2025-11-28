"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { createClient } from "@/supabase/client";
import toast from "react-hot-toast";
//Styles
import styles from "./Sidebar.module.scss";
//Icons
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoWallet } from "react-icons/io5";
import { FaCalculator } from "react-icons/fa6";
import { FaRepeat } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
//Components
import ConfirmAction from "@/shared/components/ConfirmAction";
import Switcher from "@/shared/components/ui/Switcher";
//Styles
import { toastStyle } from "@/shared/styles/toastStyle";
//Animations
import { AnimatePresence } from "motion/react";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";

export default function Sidebar() {
  const [signoutClicked, setSignoutClicked] = useState(false);

  const [collapsed, setCollapsed] = useLocalStorage("sidebar-collapsed", true);

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
    { name: "Settings", href: "/user/account-details", icon: <IoSettings /> },
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
      <h2 className={styles.logo}>Spendie.</h2>
      <ul className={styles.menu}>
        {sidebarItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={clsx(
                styles.item,
                pathname.startsWith("/user") && item.href.startsWith("/user")
                  ? styles.active
                  : "",
                pathname === item.href ? styles.active : ""
              )}
            >
              <i className={styles.icon}>{item.icon}</i>
              <span className={styles.label}>{item.name}</span>
            </Link>
          </li>
        ))}
        <li className={styles.sidebarSwitch}>
          <Switcher value={collapsed} onChange={handleSidebarToggle} />
        </li>

        <li
          className={`${styles.item} ${styles.logout}`}
          onClick={() => setSignoutClicked(true)}
        >
          <i className={styles.icon}>
            <FaSignOutAlt />
          </i>
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
