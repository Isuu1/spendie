import React, { useRef } from "react";
//Animations
import { motion } from "motion/react";
//Hooks
import { useClickOutside } from "@/shared/hooks/useClickOutside";
//Icons
import { PanelRightOpen } from "lucide-react";
//Components
import DashboardSidebarContent from "./DashboardSidebarContent";

type DashboardMobileSidebarProps = {
  onClose: () => void;
};

const DashboardMobileSidebar = ({ onClose }: DashboardMobileSidebarProps) => {
  const mobileSidebarRef = useRef<HTMLDivElement>(null);

  useClickOutside(mobileSidebarRef, onClose);

  return (
    <motion.div
      className="z-97 fixed h-full bg-background p-4 flex flex-col text-secondary"
      ref={mobileSidebarRef}
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "tween", duration: 0.15 }}
    >
      <h2 className="text-brand">Spendie.</h2>
      <span
        className="absolute top-2.5 right-0 cursor-pointer rounded-sm p-1"
        onClick={onClose}
      >
        <PanelRightOpen size={20} />
      </span>

      <DashboardSidebarContent menuClassName="mt-8" />
    </motion.div>
  );
};

export default DashboardMobileSidebar;
