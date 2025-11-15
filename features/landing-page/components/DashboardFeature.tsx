import React from "react";
import dashboard from "@/public/images/dashboard-feature.png";
import Image from "next/image";
//Styles
import styles from "./DashboardFeature.module.scss";
import Headline from "./Headline";

const DashboardFeature = () => {
  return (
    <div className={styles.dashboardFeature}>
      <Headline
        title="Choose Your Dashboard"
        subtitle="Customize your experience with our advanced dashboard features."
      />
      <div className={styles.imageWrapper}>
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
  );
};

export default DashboardFeature;
