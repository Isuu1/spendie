"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/cn";
//Components
import UserProfileCard from "@/features/user/components/UserProfileCard";
import DashboardMobileSidebar from "./DashboardMobileSidebar";
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
          <DashboardMobileSidebar onClose={() => setMobileSidebarOpen(false)} />
        )}
      </AnimatePresence>
      <header className="row-start-1 col-span-3 flex items-center justify-end gap-4 py-4 px-2">
        <h2
          className={cn(
            "text-accent absolute top-5 left-5 z-48",
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
            "relative cursor-pointer p-2.5 rounded-full bg-card transition-colors",
            "hover:bg-card-foreground",
          )}
        >
          <Bell size={16} />
          <span className="absolute bottom-0 -right-1.5 text-xs bg-accent rounded-full w-3 h-3"></span>
        </span>
        <UserProfileCard />
      </header>
    </>
  );
};

export default DashboardHeader;
