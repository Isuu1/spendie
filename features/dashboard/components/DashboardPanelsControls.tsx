"use client";

import React, { useRef, useState } from "react";
//Styles
import styles from "./DashboardPanelsControls.module.scss";
//Icons
import { MdSpaceDashboard } from "react-icons/md";
//Types
import { PanelName } from "@/features/dashboard/config/panelsLibrary";
//Animations
import { AnimatePresence, motion } from "motion/react";
//Hooks
import { useClickOutside } from "@/shared/hooks/useClickOutside";
//Config
import { panelsLibrary } from "@/features/dashboard/config/panelsLibrary";
//Api
import { useUserSettingsClient } from "@/features/user/api/useUserSettingsClient";
import { useTogglePanelVisibility } from "@/features/user/api/useTogglePanelVisibility";

const panelMenuVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15 },
};

const DashboardPanelsControls: React.FC = ({}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: settings } = useUserSettingsClient();

  const { mutate: togglePanel } = useTogglePanelVisibility();

  const visiblePanels = settings?.visible_panels || [];

  const panelMenuRef = useRef<HTMLUListElement>(null);

  const isPanelActive = (panelName: PanelName) => {
    return visiblePanels.includes(panelName);
  };

  const handleChange = (panelName: PanelName, isActive: boolean) => {
    togglePanel({ panelName, isActive });
  };

  useClickOutside(panelMenuRef, () => setMenuOpen(false));

  return (
    <div className={styles.dashboardControls}>
      <i className={styles.panelsIcon} onClick={() => setMenuOpen(!menuOpen)}>
        <MdSpaceDashboard />
      </i>
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            ref={panelMenuRef}
            className={styles.menu}
            variants={panelMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {panelsLibrary.map((panel) => (
              <li key={panel.name}>
                <span
                  className={`${styles.panelStatus} ${
                    isPanelActive(panel.name) ? styles.active : styles.inactive
                  }`}
                  onClick={() =>
                    handleChange(panel.name, !!isPanelActive(panel.name))
                  }
                >
                  <motion.span
                    initial={false}
                    animate={{
                      x: isPanelActive(panel.name) ? "0%" : "100%",
                      backgroundColor: isPanelActive(panel.name)
                        ? "#b4b4b4"
                        : "#444444ff",
                    }}
                  />
                </span>
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
