"use client";

import React from "react";
//Animations
import { motion } from "motion/react";
import { cn } from "@/shared/lib/cn";

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
      className={cn(
        "flex flex-col p-4 rounded-2xl bg-[linear-gradient(120deg,rgba(61,64,71,1)_0%,rgba(46,49,58,1)_100%)]",
        className,
      )}
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
