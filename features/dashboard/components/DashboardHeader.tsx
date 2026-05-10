"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/cn";
//Components
import UserProfileCard from "@/features/user/components/UserProfileCard";
import MobileSidebar from "./MobileSidebar";
//Animations
import { AnimatePresence } from "motion/react";
//Icons
import { Bell, Menu } from "lucide-react";

const DashboardHeader = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {mobileSidebarOpen && (
          <MobileSidebar onClose={() => setMobileSidebarOpen(false)} />
        )}
      </AnimatePresence>
      <div className="[grid-area:header] flex items-center justify-end gap-4 py-4 px-2">
        <h2
          className={cn(
            "text-brand absolute top-5 left-5 z-99",
            "max-sm:hidden",
          )}
        >
          Spendie.
        </h2>
        <span
          className={cn(
            "relative cursor-pointer p-2 rounded-md bg-bg-surface transition-colors",
            "hover:bg-bg-surface-dark-hover",
            "mr-auto sm:hidden",
          )}
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        >
          <Menu size={14} />
        </span>
        <span
          className={cn(
            "relative cursor-pointer p-2 rounded-md bg-bg-surface transition-colors",
            "hover:bg-bg-surface-dark-hover",
          )}
        >
          <Bell size={14} />
          <span className="absolute -bottom-1 -right-1.5 text-xs bg-brand rounded-full w-3 h-3"></span>
        </span>
        <UserProfileCard />
      </div>
    </>
  );
};

export default DashboardHeader;
