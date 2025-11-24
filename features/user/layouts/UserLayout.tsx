"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
//Styles
import styles from "./UserLayout.module.scss";
import clsx from "clsx";
//Icons
import { FaUser } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className={styles.userLayout}>
      <ul className={styles.menu}>
        <Link href="/user/account-details">
          <li
            className={clsx(styles.item, {
              [styles.active]: pathname.includes("account-details"),
            })}
          >
            <i className={styles.icon}>
              <FaUser />
            </i>
            <span>Account details</span>
          </li>
        </Link>
        <Link href="/user/dashboard-settings">
          <li
            className={clsx(styles.item, {
              [styles.active]: pathname.includes("dashboard-settings"),
            })}
          >
            <i className={styles.icon}>
              <IoSettings />
            </i>
            <span>Dashboard settings</span>
          </li>
        </Link>
      </ul>
      <>{children}</>
    </div>
  );
};

export default UserLayout;
