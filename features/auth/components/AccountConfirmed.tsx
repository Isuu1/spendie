import React from "react";
import Link from "next/link";
import success from "@/public/images/success.svg";
import Image from "next/image";

const AccountConfirmed = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center p-8">
      <Image
        src={success}
        alt="Account Confirmed"
        className="relative! w-26!"
        fill
      />
      <h2>Your account is verified!</h2>
      <p>You can now log in and start using Spendie.</p>

      <Link href="/login" className="bg-brand rounded-md px-4 py-2">
        Go to Login
      </Link>
    </div>
  );
};

export default AccountConfirmed;
