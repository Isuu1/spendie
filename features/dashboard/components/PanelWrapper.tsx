"use client";

import React from "react";
//Styles
import styles from "./PanelWrapper.module.scss";
//Icons
import { TiThMenu } from "react-icons/ti";
//Animations
import { motion } from "motion/react";

interface PanelWrapperProps {
  name: string;
  children: React.ReactNode;
}

const panelWrapperVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
};

const PanelWrapper: React.FC<PanelWrapperProps> = ({ name, children }) => {
  return (
    <motion.div
      className={styles.panelWrapper}
      variants={panelWrapperVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      transition={{ duration: 0.15 }}
    >
      <div className={styles.header}>
        <h3>{name}</h3>
        <span className={styles.panelMenu}>
          <TiThMenu className={styles.icon} />
        </span>
      </div>
      <>{children}</>
    </motion.div>
  );
};

export default PanelWrapper;
