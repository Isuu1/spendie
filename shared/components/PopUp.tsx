"use client";

import React from "react";
import styles from "./PopUp.module.scss";
import { motion } from "motion/react";
import clsx from "clsx";

const panelMenuVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15 },
};

interface PopUpProps {
  children: React.ReactNode;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  popupRef?: React.RefObject<HTMLDivElement | null>;
  inheritBackground?: boolean;
}

const PopUp = ({
  children,
  top,
  right,
  bottom,
  left,
  popupRef,
  inheritBackground = false,
}: PopUpProps) => {
  return (
    <motion.div
      variants={panelMenuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={clsx(styles.popUp, {
        [styles.inheritBackground]: inheritBackground,
      })}
      style={{ top: top, right: right, bottom: bottom, left: left }}
      ref={popupRef}
    >
      {children}
    </motion.div>
  );
};

export default PopUp;
