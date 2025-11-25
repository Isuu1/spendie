"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { createClient } from "@/supabase/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
//Styles
import styles from "./UserProfileCard.module.scss";
import { toastStyle } from "@/shared/styles/toastStyle";
//Icons
import { FaSignOutAlt } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
//Hooks
import { useUserClient } from "../hooks/useUserClient";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
//Animations
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
//Components
import ConfirmAction from "@/shared/components/ConfirmAction";

const userMenuVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const UserProfileCard: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [signoutClicked, setSignoutClicked] = React.useState(false);

  const { data: user, error } = useUserClient();

  const supabase = createClient();

  const router = useRouter();

  const menuRef = React.useRef<HTMLUListElement>(null);

  useClickOutside(menuRef, () => setMenuOpen(false));

  if (error) {
    return <div className={styles.userProfile}>Error loading user data</div>;
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out. Please try again.", toastStyle);
    }
    router.push("/");
  };

  return (
    <div
      className={styles.userProfileContainer}
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <div className={styles.profile}>
        <div className={styles.imageWrapper}>
          <Image
            className={styles.avatar}
            src={user?.avatar || "https://i.pravatar.cc/150?img=3"}
            alt=""
            width={30}
            height={30}
          />
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            ref={menuRef}
            className={styles.menu}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={userMenuVariants}
            transition={{ duration: 0.15 }}
          >
            <li>{user?.email}</li>
            <li>
              <Link href="/user/account-details" className={styles.item}>
                <IoSettings />
                <span>Settings</span>
              </Link>
            </li>
            <li className={styles.item} onClick={() => setSignoutClicked(true)}>
              <FaSignOutAlt />
              <span>Logout</span>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {signoutClicked && (
          <ConfirmAction
            message="Are you sure you want to sign out?"
            onCancel={() => setSignoutClicked(false)}
            onConfirm={handleSignOut}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfileCard;
