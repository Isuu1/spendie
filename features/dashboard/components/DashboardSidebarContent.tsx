import React, { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { cn } from "@/shared/lib/cn";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/supabase/client";
//Config
import { sidebarItems } from "../config/sidebarItems";
//Icons
import { LogOut } from "lucide-react";
//Animations
import { AnimatePresence } from "motion/react";
//Components
import ConfirmAction from "@/shared/components/ConfirmAction";
//Styles
import { toastStyle } from "@/shared/styles/toastStyle";

type DashboardSidebarContentProps = {
  collapsed?: boolean;
  menuClassName?: string;
};

const DashboardSidebarContent = ({
  collapsed,
  menuClassName,
}: DashboardSidebarContentProps) => {
  const [signoutClicked, setSignoutClicked] = useState(false);

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
  return (
    <>
      <ul
        className={cn(
          "box-border z-4 relative flex flex-col gap-6 list-none grow mt-13",
          menuClassName,
        )}
      >
        {sidebarItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={cn(
                "relative cursor-pointer flex gap-4 items-center whitespace-nowrap transition-colors duration-150 ease-in-out",
                pathname.startsWith(item.href) && "text-accent!",
                "hover:text-accent!",
              )}
            >
              <span className="shrink-0 block text-lg!">{item.icon}</span>
              <span
                className={cn(
                  "opacity-0 pointer-events-none transition-opacity duration-150 ease-in-out",
                  "group-hover:opacity-100",
                  !collapsed && "opacity-100 pointer-events-auto",
                )}
              >
                {item.name}
              </span>
            </Link>
          </li>
        ))}

        <li
          className={cn(
            "relative cursor-pointer flex gap-4 items-center whitespace-nowrap transition-colors duration-150 ease-in-out",
            "hover:text-accent!",
            "mt-auto",
          )}
          onClick={() => setSignoutClicked(true)}
        >
          <span className="shrink-0 block text-lg!">
            <LogOut size={20} />
          </span>
          <span
            className={cn(
              "opacity-0 pointer-events-none transition-opacity duration-150 ease-in-out",
              "group-hover:opacity-100",
              !collapsed && "opacity-100 pointer-events-auto",
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
    </>
  );
};

export default DashboardSidebarContent;
