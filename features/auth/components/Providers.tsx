import React from "react";
import { createClient } from "@/supabase/client";
import toast from "react-hot-toast";
//Styles
import styles from "./Providers.module.scss";
import { toastStyle } from "@/shared/styles/toastStyle";
//Icons
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";

const Providers = () => {
  const handleGoogleLogin = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
      },
    });
    if (error) {
      console.error("Error during Google OAuth sign-in:", error.message);
      toast.error(
        "Failed to initiate Google sign-in. Please try again.",
        toastStyle
      );
    }
  };

  return (
    <div className={styles.providersContainer}>
      <p className={styles.loginOptions}>OR</p>
      <div className={styles.providers}>
        <div className={styles.provider} onClick={handleGoogleLogin}>
          <FcGoogle />
        </div>
        <div className={styles.provider}>
          <BsApple />
        </div>
      </div>
    </div>
  );
};

export default Providers;
