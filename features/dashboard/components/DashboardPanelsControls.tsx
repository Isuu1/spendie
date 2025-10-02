"use client";

import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
//Styles
import styles from "./DashboardPanelsControls.module.scss";
import { toastStyle } from "@/shared/styles/toastStyle";
//Components
import Button from "@/shared/components/ui/Button";
//Icons
import { MdSpaceDashboard } from "react-icons/md";
//Utils
import { togglePanelVisibility } from "../../user/actions/togglePanelVisibility";
//Types
import { UserSettings } from "@/features/user/types/user";
//Config
import { PanelName, panelsMetaData } from "../config/panelsMetaData";
//Animations
import { AnimatePresence, motion } from "motion/react";

const panelMenuVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.15 },
};

interface DashboardPanelsControlsProps {
  settings: UserSettings;
}

const DashboardPanelsControls: React.FC<DashboardPanelsControlsProps> = ({
  settings,
}) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const tileMenuRef = useRef<HTMLUListElement>(null);

  const isPanelActive = (panelName: PanelName) => {
    return settings?.visible_panels?.includes(panelName);
  };

  const handleChange = async (panelName: PanelName, isActive: boolean) => {
    const result = await togglePanelVisibility(panelName, isActive);
    if (!result.success) {
      console.error("Failed to toggle panel visibility");
      toast.error("Failed to update panel settings", toastStyle);
      return;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tileMenuRef.current &&
        !tileMenuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tileMenuRef]);

  return (
    <div className={styles.dashboardControls}>
      <i className={styles.panelsIcon} onClick={() => setMenuOpen(!menuOpen)}>
        <MdSpaceDashboard />
      </i>
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            ref={tileMenuRef}
            className={styles.menu}
            variants={panelMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {panelsMetaData.map((panel) => (
              <li key={panel.name}>
                <Button
                  text={isPanelActive(panel.name) ? "Active" : "Inactive"}
                  variant={isPanelActive(panel.name) ? "primary" : "secondary"}
                  size="small"
                  onClick={() =>
                    handleChange(panel.name, !!isPanelActive(panel.name))
                  }
                />
                {panel.name}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPanelsControls;
