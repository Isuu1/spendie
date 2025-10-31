"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
//Styles
import styles from "./Header.module.scss";
//Icons
import { TiThMenu } from "react-icons/ti";
//Hooks
import { useClickOutside } from "@/shared/hooks/useClickOutside";
//Animations
import { motion, AnimatePresence } from "motion/react";

const mobileMenuVariants = {
  hidden: { x: 100 },
  visible: { x: 0 },
  exit: { x: 120 },
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const mobileMenuRef = useRef<HTMLUListElement>(null);

  useClickOutside(mobileMenuRef, () => setMenuOpen(false));

  return (
    <div className={styles.header}>
      <h2 className={styles.logo}>Spendie.</h2>
      <ul className={styles.nav}>
        <li className={styles.navItem}>Home</li>
        <li className={styles.navItem}>About</li>
        <li className={styles.navItem}>Contact</li>
      </ul>

      <Link className={styles.loginButton} href="/login">
        Login
      </Link>
      <div className={styles.mobileNav} onClick={() => setMenuOpen(!menuOpen)}>
        <i className={styles.icon}>
          <TiThMenu />
        </i>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            className={styles.mobileMenu}
            ref={mobileMenuRef}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2, type: "tween" }}
          >
            <li className={styles.mobileMenuItem}>Home</li>
            <li className={styles.mobileMenuItem}>About</li>
            <li className={styles.mobileMenuItem}>Contact</li>
            <Link href="/login">
              <li className={styles.mobileMenuItem}>Login</li>
            </Link>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
