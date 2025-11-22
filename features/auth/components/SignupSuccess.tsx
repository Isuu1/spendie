import React from "react";
//Styles
import styles from "./SignupSuccess.module.scss";
import Button from "@/shared/components/ui/Button";
//Icons
import { MdEmail } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { getEmailProviderUrl } from "../lib/utils/getEmailProvider";
import success from "@/public/images/success.svg";
import Image from "next/image";

interface SignupSuccessProps {
  email?: string | null;
}

const SignupSuccess = ({ email }: SignupSuccessProps) => {
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
        text="Go to mailbox"
        variant="primary"
        size="medium"
        icon={<MdEmail />}
        onClick={handleGoToMailbox}
      />
      <div className={styles.resend}>
        <p>Didn`t receive the email?</p>
        <Button
          text="Resend email"
          variant="secondary"
          size="medium"
          icon={<IoSend />}
        />
      </div>
    </div>
  );
};

export default SignupSuccess;
