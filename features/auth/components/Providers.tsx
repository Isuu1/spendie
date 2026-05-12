import React from "react";
import { createClient } from "@/supabase/client";
import toast from "react-hot-toast";
import { cn } from "@/shared/lib/cn";
import Image from "next/image";
//Styles
import { toastStyle } from "@/shared/styles/toastStyle";

const icons = {
  google: "/images/google-icon.svg",
  apple: "/images/apple-icon.svg",
};

type ProviderItemProps = {
  provider: "google" | "apple";
  onClick: () => void;
  className?: string;
};

const ProviderItem = ({ provider, onClick, className }: ProviderItemProps) => {
  return (
    <div
      className={cn(
        "cursor-pointer bg-bg-surface flex items-center justify-center rounded-lg p-2",
        "hover:bg-bg-surface-dark-hover transition-colors",
        className,
      )}
      onClick={onClick}
    >
      <Image
        src={icons[provider]}
        alt={`${provider.charAt(0).toUpperCase() + provider.slice(1)} Icon`}
        width={20}
        height={20}
      />
    </div>
  );
};

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
      <div className="w-full h-14 grid grid-cols-2 gap-8">
        <ProviderItem provider="google" onClick={handleGoogleLogin} />
        <ProviderItem
          provider="apple"
          onClick={() => {}}
          className="cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default Providers;
