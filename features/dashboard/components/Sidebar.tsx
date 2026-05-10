"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/supabase/client";
import toast from "react-hot-toast";
import { cn } from "@/shared/lib/cn";
//Styles
import { toastStyle } from "@/shared/styles/toastStyle";
//Icons
import { FaSignOutAlt } from "react-icons/fa";
//Components
import ConfirmAction from "@/shared/components/ConfirmAction";
import Switcher from "@/shared/components/ui/Switcher";
//Animations
import { AnimatePresence } from "motion/react";
//Hooks
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
//Config
import { sidebarItems } from "../config/sidebarItems";

export default function Sidebar() {
  const [signoutClicked, setSignoutClicked] = useState(false);

  const [collapsed, setCollapsed] = useLocalStorage("sidebar-collapsed", true);

  const pathname = usePathname();

  const router = useRouter();

  const supabase = createClient();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out. Please try again.", toastStyle);
    }
    router.push("/");
  };

  const handleSidebarToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={cn(
        "group overflow-hidden",
        "box-border z-98 absolute bg-bg-primary w-16.25 transition-width duration-150 linear [grid-area:sidebar] p-5 h-full flex flex-col gap-8",
        collapsed && "relative w-62.5",
        "hover:w-62.5",
        "max-sm:hidden",
      )}
    >
      <ul className="box-border z-4 relative flex flex-col gap-6 list-none h-full">
        {sidebarItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={cn(
                "relative cursor-pointer flex gap-4 items-center whitespace-nowrap transition-colors duration-150 ease-in-out",
                pathname.startsWith(item.href) && "text-brand",
                "hover:text-brand",
              )}
            >
              <span className="shrink-0 block text-lg!">{item.icon}</span>
              <span
                className={cn(
                  "opacity-0 pointer-events-none transition-opacity duration-150 ease-in-out",
                  "group-hover:opacity-100",
                )}
              >
                {item.name}
              </span>
            </Link>
          </li>
        ))}
        <li
          className={cn(
            "opacity-0 absolute top-1/2 -right-1",
            "group-hover:opacity-100",
          )}
        >
          <Switcher value={!collapsed} onChange={handleSidebarToggle} />
        </li>

        <li
          className={cn(
            "relative cursor-pointer flex gap-4 items-center whitespace-nowrap transition-colors duration-150 ease-in-out",
            "hover:text-brand!",
            "mt-auto",
          )}
          onClick={() => setSignoutClicked(true)}
        >
          <span className="shrink-0 block text-lg!">
            <FaSignOutAlt />
          </span>
          <span
            className={cn(
              "opacity-0 pointer-events-none transition-opacity duration-150 ease-in-out",
              "group-hover:opacity-100",
            )}
          >
            Logout
          </span>
        </li>
      </ul>
      <AnimatePresence>
        {signoutClicked && (
          <ConfirmAction
            title="Are you sure you want to sign out?"
            onCancel={() => setSignoutClicked(false)}
            onConfirm={handleSignOut}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
