"use client";

import React from "react";
//Styles
import styles from "./Features.module.scss";
//Icons
import { FaPiggyBank } from "react-icons/fa6";
import { FaRepeat } from "react-icons/fa6";
// import { FaChartLine } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import Button from "@/shared/components/ui/Button";
import Headline from "./Headline";
import { scrollToSection } from "../lib/utils/scrollToSection";

const Features = () => {
  // const scrollToSection = (id: string) => {
  //   const element = document.getElementById(id);
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  return (
    <div className={styles.features}>
      <Headline
        title="All your money, organized."
        subtitle="Track, plan, and forecast effortlessly."
      />
      <div className={styles.cardsContainer}>
        <div className={styles.featureCard}>
          <i className={styles.icon}>
            <FaPiggyBank />
          </i>
          <h2>Track all accounts</h2>
          <p>
            Connect bank accounts with Plaid and see your total balance in one
            view.
          </p>
          <Button variant="primary" size="medium">
            Read more
          </Button>
        </div>
        <div className={styles.featureCard}>
          <i className={styles.icon}>
            <FaRepeat />
          </i>
          <h2>Recurring payments simplified</h2>
          <p>
            Never miss a bill again. Mark payments as paid and see what’s due
            next.
          </p>
          <Button
            variant="primary"
            size="medium"
            onClick={() => scrollToSection("payments")}
          >
            Read more
          </Button>
        </div>
        <div className={styles.featureCard}>
          <i className={styles.icon}>
            <MdSpaceDashboard />
          </i>
          <h2>Customizable dashboard</h2>
          <p>Choose your dashboard tiles and make Spendie fit your goals.</p>
          <Button
            variant="primary"
            size="medium"
            onClick={() => scrollToSection("dashboard")}
          >
            Read more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Features;
