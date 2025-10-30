import React from "react";
//Styles
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerContent}>
          <h2>Spendie.</h2>
          {/* <p>Your one-stop solution for managing your expenses.</p> */}
        </div>
        <ul className={styles.footerLinks}>
          <li>Features</li>
          <li>Pricing</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>

      <div className={styles.footerBottom}>
        <p>© 2024 Spendie</p>
        <p>Terms of Service</p>
        <p>Privacy Policy</p>
      </div>
    </div>
  );
};

export default Footer;
