import React from "react";
//Styles
import styles from "./SignupSuccess.module.scss";
import Button from "@/shared/components/ui/Button";
//Icons
import { MdEmail } from "react-icons/md";
import { IoSend } from "react-icons/io5";

const SignupSuccess = () => {
  return (
    <div className={styles.signupSuccess}>
      <h2>You’re almost there!</h2>
      <h3>
        Check your email and click the confirmation link to finish setting up
        your Spendie account.
      </h3>
      <Button
        text="Go to mailbox"
        variant="primary"
        size="medium"
        icon={<MdEmail />}
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
