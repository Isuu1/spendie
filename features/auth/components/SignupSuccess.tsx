"use client";

import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
//Components
import Button from "@/shared/components/ui/Button";
//Icons
import { Mail, SendHorizontal } from "lucide-react";
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
    <div className="flex flex-col items-center justify-center gap-6 text-center p-8">
      <Image
        src={success}
        alt="Account Confirmed"
        className="relative! w-26!"
        fill
      />
      <h2>You’re almost there!</h2>
      <p>
        Check your email and click the confirmation link to finish setting up
        your Spendie account.
      </p>
      <Button
        variant="default"
        size="default"
        icon={<Mail />}
        onClick={handleGoToMailbox}
      >
        Go to mailbox
      </Button>
      <div className="flex flex-col items-center gap-4">
        <p>Didn`t receive the email?</p>
        <Button variant="secondary" size="default" icon={<SendHorizontal />}>
          Resend email
        </Button>
      </div>
    </div>
  );
};

export default SignupSuccess;
