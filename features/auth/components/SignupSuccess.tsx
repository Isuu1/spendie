"use client";

import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
//Styles
import styles from "./SignupSuccess.module.scss";
import Button from "@/shared/components/ui/Button";
//Icons
import { MdEmail } from "react-icons/md";
import { IoSend } from "react-icons/io5";
//Utils
import { getEmailProviderUrl } from "../lib/utils/getEmailProvider";
//Assets
import success from "@/public/images/success.svg";

const SignupSuccess = () => {
  const params = useSearchParams();
  const email = params.get("email");

  const emailUrl = getEmailProviderUrl(email || "");

  const handleGoToMailbox = () => {
    window.open(emailUrl, "_blank");
  };
  return (
    <div className={styles.signupSuccess}>
      <Image
        src={success}
        alt="Account Confirmed"
        className={styles.successImage}
        fill
      />
      <h2>You’re almost there!</h2>
      <p>
        Check your email and click the confirmation link to finish setting up
        your Spendie account.
      </p>
      <Button
        variant="primary"
        size="medium"
        icon={<MdEmail />}
        onClick={handleGoToMailbox}
      >
        Go to mailbox
      </Button>
      <div className={styles.resend}>
        <p>Didn`t receive the email?</p>
        <Button variant="secondary" size="medium" icon={<IoSend />}>
          Resend email
        </Button>
      </div>
    </div>
  );
};

export default SignupSuccess;
