import React from "react";
//Styles
import styles from "./Features.module.scss";
//Icons
import { FaPiggyBank } from "react-icons/fa6";
import { FaRepeat } from "react-icons/fa6";
// import { FaChartLine } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";

const Features = () => {
  return (
    <div className={styles.features}>
      <div className={styles.headline}>
        <h2>All your money, organized.</h2>
        <p>Track, plan, and forecast effortlessly.</p>
      </div>
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
        </div>
        <div className={styles.featureCard}>
          <i className={styles.icon}>
            <MdSpaceDashboard />
          </i>
          <h2>Customizable dashboard</h2>
          <p>Choose your dashboard tiles and make Spendie fit your goals.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
