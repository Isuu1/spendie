import React from "react";
//Styles
import styles from "./Header.module.scss";
import { TiThMenu } from "react-icons/ti";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.header}>
      <h2>Spendie.</h2>
      <ul className={styles.nav}>
        <li className={styles.navItem}>Home</li>
        <li className={styles.navItem}>About</li>
        <li className={styles.navItem}>Contact</li>
      </ul>

      <Link className={styles.loginButton} href="/login">
        Login
      </Link>
      <div className={styles.mobileNav}>
        <i className={styles.icon}>
          <TiThMenu />
        </i>
      </div>
    </div>
  );
};

export default Header;
