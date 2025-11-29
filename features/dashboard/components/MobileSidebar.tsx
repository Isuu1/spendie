import React, { useRef, useState } from "react";
//Styles
import styles from "./MobileSidebar.module.scss";
//Icons
import { FaSignOutAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

//Components
import ConfirmAction from "@/shared/components/ConfirmAction";
import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { sidebarItems } from "../config/sidebarItems";
import { toastStyle } from "@/shared/styles/toastStyle";
import { createClient } from "@/supabase/client";
import { toast } from "react-hot-toast";
import { useClickOutside } from "@/shared/hooks/useClickOutside";

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
      className={styles.sidebar}
      ref={mobileSidebarRef}
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "tween", duration: 0.15 }}
    >
      <h2 className={styles.logo}>Spendie.</h2>
      <i className={styles.closeButton} onClick={onClose}>
        <IoClose />
      </i>
      <ul className={styles.menu}>
        {sidebarItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={clsx(
                styles.item,
                pathname.startsWith("/user") && item.href.startsWith("/user")
                  ? styles.active
                  : "",
                pathname === item.href ? styles.active : ""
              )}
            >
              <i className={styles.icon}>{item.icon}</i>
              <span className={styles.label}>{item.name}</span>
            </Link>
          </li>
        ))}
        <li
          className={`${styles.item} ${styles.logout}`}
          onClick={() => setSignoutClicked(true)}
        >
          <i className={styles.icon}>
            <FaSignOutAlt />
          </i>
          <span className={styles.label}>Logout</span>
        </li>
      </ul>
      <AnimatePresence>
        {signoutClicked && (
          <ConfirmAction
            message="Are you sure you want to sign out?"
            onCancel={() => setSignoutClicked(false)}
            onConfirm={handleSignOut}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MobileSidebar;
