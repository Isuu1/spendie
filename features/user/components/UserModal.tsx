"use client";

import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";

//Styles
import styles from "./UserModal.module.scss";
//Icons
import { FaUser } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface UserModalProps {
  onClose: () => void;
  isOpen?: boolean;
}

const UserModal: React.FC<UserModalProps> = ({ onClose }) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${styles.userModal}`)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const router = useRouter();

  const userModalVariants = {
    hidden: { x: -200 },
    visible: { x: 0, transition: { duration: 0.2 } },
    exit: { x: -200, transition: { duration: 0.2 } },
  };

  const handleMenuItemClick = useCallback(
    (path: string) => {
      router.push(path);
      onClose();
    },
    [router, onClose]
  );

  return (
    <motion.ul
      className={styles.userModal}
      variants={userModalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <li>
        <Image
          className={styles.avatar}
          src="https://i.pravatar.cc/150?img=3"
          alt=""
          width={50}
          height={50}
        />
      </li>
      <li className={styles.details}>
        <span>Isuususu</span>
        <span className={styles.email}>test@email.com</span>
      </li>
      <li
        className={styles.item}
        onClick={() => handleMenuItemClick("/user/account-details")}
      >
        <FaUser />
        <span>Account details</span>
      </li>
      <li className={styles.item}>
        <IoSettings />
        <span>Settings</span>
      </li>
      <li className={styles.item}>
        <FaSignOutAlt />
        <span>Logout</span>
      </li>
    </motion.ul>
  );
};

export default UserModal;
