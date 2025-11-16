"use client";

import React from "react";
//Styles
import styles from "./AuthNav.module.scss";
import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";

const AuthNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <ul className={styles.nav}>
      <motion.span
        className={styles.active}
        animate={{ x: pathname.includes("/login") ? "0%" : "100%" }}
        initial={false} // Prevent animation on initial render
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      ></motion.span>
      <li className={styles.item} onClick={() => router.push("/login")}>
        Login
      </li>
      <li className={styles.item} onClick={() => router.push("/signup")}>
        Signup
      </li>
    </ul>
  );
};

export default AuthNav;
