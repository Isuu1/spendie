import React, { useRef, useState } from "react";
//Icons
import { IoMdMore } from "react-icons/io";
import { MdEditDocument } from "react-icons/md";
import { PiPlugsConnectedFill } from "react-icons/pi";
import { BiSolidHide } from "react-icons/bi";
//Styles
import styles from "./AccountItemMenu.module.scss";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
//Animations
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";

const dropdownVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

type AccountItemMenuProps = {
  onRename: () => void;
};

const AccountItemMenu = ({ onRename }: AccountItemMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLUListElement>(null);

  const handleRename = () => {
    onRename();
    setMenuOpen(false);
  };

  useClickOutside(dropdownRef, () => {
    if (menuOpen) setMenuOpen(false);
  });

  return (
    <div className={clsx(styles.menu, menuOpen && styles.active)}>
      <span
        className={styles.icon}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <IoMdMore />
      </span>
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            className={styles.dropdown}
            ref={dropdownRef}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <li className={styles.option} onClick={handleRename}>
              <MdEditDocument />
              Rename
            </li>
            <li className={styles.option}>
              <PiPlugsConnectedFill />
              Disconnect
            </li>
            <li className={styles.option}>
              <BiSolidHide />
              Hide
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountItemMenu;
