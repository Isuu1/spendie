"use client";

import React from "react";
//Styles
import styles from "./AccountDetails.module.scss";
//Components
import ChangeDetailsForm from "./ChangeDetailsForm";
import ChangePasswordForm from "./ChangePasswordForm";
import ChangeAvatarForm from "./ChangeAvatarForm";
import ErrorMessage from "@/shared/components/ErrorMessage";
//Hooks
import { useUser } from "../hooks/useUser";

const AccountDetails: React.FC = () => {
  const { data: user, error } = useUser();

  if (error || !user) {
    return (
      <>
        <h3>Account</h3>
        <ErrorMessage
          variant="panel"
          message="Failed to load your account from the server."
        />
      </>
    );
  }

  return (
    <div className={styles.accountDetails}>
      <section className={styles.section}>
        <h3>Profile picture</h3>
        <ChangeAvatarForm user={user} />
      </section>
      <section className={styles.section}>
        <h3>Account details</h3>
        <ChangeDetailsForm user={user} />
      </section>
      <section className={styles.section}>
        <h3>Password</h3>
        <ChangePasswordForm user={user} />
      </section>
    </div>
  );
};

export default AccountDetails;
