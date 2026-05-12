import React from "react";
import { createClient } from "@/supabase/client";
import toast from "react-hot-toast";
import { cn } from "@/shared/lib/cn";
import Image from "next/image";
//Styles
import { toastStyle } from "@/shared/styles/toastStyle";

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
        toastStyle,
      );
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <p className="w-full text-center text-text-secondary">OR</p>
      <div className="w-full h-18 grid grid-cols-2 gap-8">
        <div
          className={cn(
            "cursor-pointer bg-bg-surface flex items-center justify-center rounded-lg p-2",
            "hover:bg-bg-surface-dark-hover transition-colors",
          )}
          onClick={handleGoogleLogin}
        >
          <Image
            src="/images/google-icon.svg"
            alt="Google Icon"
            width={22}
            height={22}
          />
        </div>
        <div
          className={cn(
            "cursor-not-allowed bg-bg-surface flex items-center justify-center rounded-lg p-2",
            "hover:bg-bg-surface-dark-hover transition-colors",
          )}
        >
          <Image
            src="/images/apple-icon.svg"
            alt="Apple Icon"
            width={22}
            height={22}
          />
        </div>
      </div>
    </div>
  );
};

export default Providers;
