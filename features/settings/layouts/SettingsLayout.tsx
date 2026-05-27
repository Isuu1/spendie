"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/shared/lib/cn";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-8 mt-2">
      <nav className="relative flex gap-4 pr-8 h-full max-lg:flex-row">
        <Link
          href="/settings/user/account-details"
          className={cn(
            "flex gap-2 items-center bg-card whitespace-nowrap px-4 py-2 rounded-full",
            pathname.includes("account-details") && "bg-accent",
          )}
        >
          <span>Account details</span>
        </Link>
        <Link
          href="/settings/dashboard-settings"
          className={cn(
            "flex gap-2 items-center bg-card whitespace-nowrap px-4 py-2 rounded-full",
            pathname.includes("dashboard-settings") && "bg-accent",
          )}
        >
          <span>Dashboard settings</span>
        </Link>
      </nav>

      <>{children}</>
    </div>
  );
};

export default SettingsLayout;
