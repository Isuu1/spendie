"use client";

import React from "react";
//Animations
import { motion } from "motion/react";

type PanelWrapperProps = {
  children: React.ReactNode;
};

const PanelWrapper = ({ children }: PanelWrapperProps) => {
  return (
    <motion.div
      className="flex flex-col p-4 rounded-lg bg-bg-surface break-inside-avoid max-w-lg mb-5"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      layout
      transition={{ duration: 0.1, ease: "easeInOut" }}
    >
      <>{children}</>
    </motion.div>
  );
};

export default PanelWrapper;
