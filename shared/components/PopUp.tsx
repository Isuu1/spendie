"use client";

import React from "react";
import styles from "./PopUp.module.scss";
import { motion } from "motion/react";

const panelMenuVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15 },
};

const PopUp = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      variants={panelMenuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={styles.popUp}
    >
      {children}
    </motion.div>
  );
};

export default PopUp;
