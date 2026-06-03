"use client";

import React from "react";
import { cn } from "@/shared/lib/cn";
//Animations
import { motion } from "motion/react";

type DashboardPanelWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

const DashboardPanelWrapper = ({
  children,
  className,
}: DashboardPanelWrapperProps) => {
  return (
    <motion.div
      className={cn("flex flex-col p-4 rounded-2xl bg-card", className)}
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

export default DashboardPanelWrapper;
