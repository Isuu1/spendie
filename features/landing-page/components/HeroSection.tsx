import React from "react";
import Image from "next/image";
//Styles
import styles from "./HeroSection.module.scss";
//Images
import dashboard from "@/public/images/dashboard2.png";

const HeroSection = () => {
  return (
    <div className={styles.heroSection}>
      <div className={styles.headline}>
        <h1>Take control of your money — effortlessly.</h1>
        <p className={styles.subheadline}>
          Spendie brings your accounts, bills, and recurring payments together
          into one clear dashboard — so you can plan smarter and stress less.
        </p>
      </div>
      <div className={styles.image}>
        <Image src={dashboard} alt="Hero Image" />
      </div>
    </div>
  );
};

export default HeroSection;
