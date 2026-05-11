import React, { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/supabase/client";
import { toast } from "react-hot-toast";
import { cn } from "@/shared/lib/cn";
//Styles
import { toastStyle } from "@/shared/styles/toastStyle";
//Components
import ConfirmAction from "@/shared/components/ConfirmAction";
//Animations
import { AnimatePresence, motion } from "motion/react";
//Config
import { sidebarItems } from "../config/sidebarItems";
//Hooks
import { useClickOutside } from "@/shared/hooks/useClickOutside";
//Icons
import { LogOut, PanelRightOpen } from "lucide-react";

interface MobileSidebarProps {
  onClose: () => void;
}

const MobileSidebar = ({ onClose }: MobileSidebarProps) => {
  const [signoutClicked, setSignoutClicked] = useState(false);

  const pathname = usePathname();

  const router = useRouter();

  const mobileSidebarRef = useRef<HTMLDivElement>(null);

  const supabase = createClient();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out. Please try again.", toastStyle);
    }
    router.push("/");
  };

  useClickOutside(mobileSidebarRef, onClose);

  return (
    <motion.div
      className="z-97 fixed h-full bg-bg-primary p-4 flex flex-col text-text-secondary"
      ref={mobileSidebarRef}
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "tween", duration: 0.15 }}
    >
      <h2 className="text-brand">Spendie.</h2>
      <span
        className="absolute top-2.5 right-0 cursor-pointer rounded-sm p-1"
        onClick={onClose}
      >
        <PanelRightOpen size={20} />
      </span>
      <ul className="relative flex flex-col gap-6 list-none mt-8 grow">
        {sidebarItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={cn(
                "relative cursor-pointer flex gap-2 items-center whitespace-nowrap",
                pathname.startsWith(item.href) && "text-brand",
              )}
            >
              {item.icon}
              <span className="text-base!">{item.name}</span>
            </Link>
          </li>
        ))}
        <li
          className={cn(
            "relative cursor-pointer flex gap-2 items-center whitespace-nowrap text-2xl",
            "mt-auto",
          )}
          onClick={() => setSignoutClicked(true)}
        >
          <LogOut size={20} />

          <span className="text-base!">Logout</span>
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
    </motion.div>
  );
};

export default MobileSidebar;
