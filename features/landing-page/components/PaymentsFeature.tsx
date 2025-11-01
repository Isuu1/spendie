import React from "react";
import payments from "@/public/images/payments2.png";
import Image from "next/image";
//Styles
import styles from "./PaymentsFeature.module.scss";
import Headline from "./Headline";

const PaymentsFeature = () => {
  return (
    <div className={styles.paymentsFeature} id="payments">
      <div className={styles.bg}></div>
      <Headline
        title="Never miss a bill again."
        subtitle="Keep your subscriptions and payments on track — automatically."
      />
      <div className={styles.payments}>
        <div className={styles.imageWrapper}>
          <div className={styles.blur}></div>
          <Image
            src={payments}
            alt="Advanced Payments Illustration"
            className={styles.image}
            fill
            unoptimized
            priority
          />
        </div>
        <div className={styles.textContent}>
          <h2>Track your regular payments</h2>
          <p>
            Stay on top of your finances with our advanced payments management
            features. Easily track recurring payments, mark bills as paid, and
            get timely reminders for upcoming due dates. Our intuitive interface
            ensures you never miss a payment, helping you maintain a healthy
            financial life.
          </p>
          <ul className={styles.featuresList}>
            <li>
              <span></span>
              <p>Automatically track your regular payments</p>
            </li>
            <li>
              <span></span>
              <p>Get reminders for upcoming due dates</p>
            </li>
            <li>
              <span></span>
              <p>Visualize your payment history and trends</p>
            </li>
            <li>
              <span></span>
              <p>
                Visual timeline view — see upcoming and overdue payments in
                seconds.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaymentsFeature;
