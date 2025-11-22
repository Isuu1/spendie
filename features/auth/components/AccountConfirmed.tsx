import React from "react";
//Styles
import styles from "./AccountConfirmed.module.scss";
import Link from "next/link";
import success from "@/public/images/success.svg";
import Image from "next/image";

const AccountConfirmed = () => {
  return (
    <div className={styles.accountConfirmed}>
      <Image
        src={success}
        alt="Account Confirmed"
        className={styles.successImage}
        fill
      />
      <h2>Your account is verified!</h2>
      <p>You can now log in and start using Spendie.</p>

      <Link href="/login" className={styles.loginButton}>
        Go to Login
      </Link>
    </div>
  );
};

export default AccountConfirmed;
