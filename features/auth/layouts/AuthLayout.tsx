"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AuthNav from "../components/AuthNav";
import Header from "@/features/landing-page/components/Header";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className="w-full h-screen flex items-center justify-center bg-bg-primary">
      <Header />
      <div className="flex flex-col items-center justify-center gap-6 max-w-175 bg-card rounded-2xl p-6">
        {pathname !== "/signup/success" &&
          pathname !== "/signup/account-confirmed" && <AuthNav />}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
