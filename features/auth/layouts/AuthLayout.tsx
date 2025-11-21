"use client";

import React from "react";
//Styles
import styles from "./AuthLayout.module.scss";
import { usePathname } from "next/navigation";
import AuthNav from "../components/AuthNav";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className={styles.authLayout}>
      <div className={styles.innerWrapper}>
        <h1 className={styles.logo}>
          <Link href="/">Spendie.</Link>
        </h1>
        {pathname !== "/signup/success" && <AuthNav />}
        {children}
      </div>
      <div className={styles.image}></div>
    </div>
  );
};

export default AuthLayout;
