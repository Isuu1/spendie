import React from "react";
import dashboard from "@/public/images/dashboard-feature3.png";
import Image from "next/image";
//Styles
import styles from "./DashboardFeature.module.scss";
import Headline from "./Headline";

const DashboardFeature = () => {
  return (
    <div className={styles.dashboardFeature} id="dashboard">
      <Headline
        title="Choose Your Dashboard"
        subtitle="Customize your experience with our advanced dashboard features."
      />
      <div className={styles.bg}></div>
      <div className={styles.dashboard}>
        <div className={styles.textContent}>
          <h2>Your dashboard, built your way</h2>
          <p>
            Spendie’s modular dashboard puts you in full control. Choose the
            panels you want to see, hide the ones you don’t, and create a
            workspace that matches your goals. Rearrange sections, unpin
            insights, and lock your sidebar for a focused view — your financial
            overview has never been this flexible.
          </p>
          <ul className={styles.featuresList}>
            <li>
              <span></span>
              <p>Toggle panels on and off to create your ideal layout</p>
            </li>
            <li>
              <span></span>
              <p>
                Rearrange or unpin modules for a fully personalized experience
              </p>
            </li>
            <li>
              <span></span>
              <p>Lock the sidebar for a clean, distraction-free workspace</p>
            </li>
            <li>
              <span></span>
              <p>
                Save your preferences and sync them effortlessly across devices
              </p>
            </li>
          </ul>
        </div>
        <div className={styles.imageWrapper}>
          <div className={styles.blur}></div>
          <Image
            src={dashboard}
            alt="Advanced Payments Illustration"
            className={styles.image}
            fill
            unoptimized
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardFeature;
