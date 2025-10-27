"use client";

import React, { useRef, useState } from "react";
//Styles
import styles from "./HamburgerMenu.module.scss";
//Icons
import { TiThMenu } from "react-icons/ti";
//Animations
import { AnimatePresence, motion } from "motion/react";
//Hooks
import { useClickOutside } from "../hooks/useClickOutside";

interface HamburgerMenuProps {
  children: React.ReactNode;
  position: "left" | "right";
}

const optionsVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15 },
};

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  children,
  position,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const optionsRef = useRef<HTMLDivElement>(null);

  useClickOutside(optionsRef, () => setShowOptions(false));

  return (
    <div className={`${styles.menu} ${styles[position]}`}>
      <i
        className={styles.menuIcon}
        onClick={() => setShowOptions(!showOptions)}
      >
        <TiThMenu />
      </i>
      <AnimatePresence>
        {showOptions && (
          <motion.div
            className={styles.options}
            ref={optionsRef}
            variants={optionsVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerMenu;
