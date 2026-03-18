"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
//Styles
import styles from "./UserLayout.module.scss";
import clsx from "clsx";
//Icons
import { FaUser } from "react-icons/fa";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdAccountBalanceWallet } from "react-icons/md";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className={styles.userLayout}>
      <ul className={styles.menu}>
        <li>
          <Link
            href="/user/account-details"
            className={clsx(styles.item, {
              [styles.active]: pathname.includes("account-details"),
            })}
          >
            <i className={styles.icon}>
              <FaUser />
            </i>
            <span>Account details</span>
          </Link>
        </li>
        <li>
          <Link
            href="/user/dashboard-settings"
            className={clsx(styles.item, {
              [styles.active]: pathname.includes("dashboard-settings"),
            })}
          >
            <i className={styles.icon}>
              <TbLayoutDashboardFilled />
            </i>
            <span>Dashboard settings</span>
          </Link>
        </li>
        <li>
          <Link
            href="/user/accounts"
            className={clsx(styles.item, {
              [styles.active]: pathname.includes("accounts"),
            })}
          >
            <i className={styles.icon}>
              <MdAccountBalanceWallet />
            </i>
            <span>Accounts</span>
          </Link>
        </li>
      </ul>
      <>{children}</>
    </div>
  );
};

export default UserLayout;
