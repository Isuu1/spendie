"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AuthNav from "../components/AuthNav";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className="w-full h-screen flex items-center justify-center bg-bg-primary">
      <div className="flex flex-col items-center justify-center gap-6 max-w-175 bg-card rounded-2xl p-6">
        <h2 className="absolute top-6 left-6 text-accent!">
          <Link href="/">Spendie.</Link>
        </h2>
        {pathname !== "/signup/success" &&
          pathname !== "/signup/account-confirmed" && <AuthNav />}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
