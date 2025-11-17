import React from "react";
//Styles
import styles from "./Providers.module.scss";
//Icons
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
//Components
import Button from "@/shared/components/ui/Button";

const Providers = () => {
  return (
    <div className={styles.providersContainer}>
      <p className={styles.loginOptions}>OR</p>
      <Button
        className={styles.googleLoginButton}
        text="Login with Google"
        size="large"
        variant="secondary"
        type="button"
        icon={<FcGoogle />}
        iconPosition="left"
      />
      <Button
        className={styles.appleLoginButton}
        text="Login with Apple"
        size="large"
        variant="secondary"
        type="button"
        icon={<BsApple />}
        iconPosition="left"
      />
    </div>
  );
};

export default Providers;
