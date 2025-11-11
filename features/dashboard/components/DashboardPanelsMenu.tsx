"use client";

import clsx from "clsx";
import React, { useRef } from "react";
//Animations
import { motion } from "motion/react";
import { useUserSettingsClient } from "@/features/user/api/useUserSettingsClient";
import { useTogglePanelVisibility } from "@/features/user/api/useTogglePanelVisibility";
import { PanelName, panelsLibrary } from "../config/panelsLibrary";
//Styles
import styles from "./DashboardPanelsMenu.module.scss";
import { useClickOutside } from "@/shared/hooks/useClickOutside";

const panelMenuVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15 },
};

interface DashboardPanelsMenuProps {
  onClose: () => void;
}

const DashboardPanelsMenu: React.FC<DashboardPanelsMenuProps> = ({
  onClose,
}) => {
  const { data: settings } = useUserSettingsClient();

  const { mutate: togglePanel, isPending, error } = useTogglePanelVisibility();

  console.log("isPending:", isPending);
  console.log("error:", error);

  const visiblePanels = settings?.visible_panels || [];

  const panelMenuRef = useRef<HTMLUListElement>(null);

  const isPanelActive = (panelName: PanelName) => {
    return visiblePanels.includes(panelName);
  };

  const handleChange = (panelName: PanelName, isActive: boolean) => {
    togglePanel({ panelName, isActive });
  };

  useClickOutside(panelMenuRef, () => onClose());

  return (
    <motion.ul
      ref={panelMenuRef}
      className={styles.menu}
      variants={panelMenuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {panelsLibrary.map((panel) => (
        <li className={styles.menuItem} key={panel.name}>
          <span
            className={clsx(styles.panelStatus, [
              { [styles.pending]: isPending },
              { [styles.active]: isPanelActive(panel.name) },
              { [styles.inactive]: !isPanelActive(panel.name) },
            ])}
            onClick={() =>
              handleChange(panel.name, !!isPanelActive(panel.name))
            }
          >
            <motion.span
              className={styles.indicator}
              initial={false}
              animate={{
                x: isPanelActive(panel.name) ? "0%" : "100%",
              }}
            />
          </span>
          <span className={styles.panelName}>{panel.name}</span>
        </li>
      ))}
    </motion.ul>
  );
};

export default DashboardPanelsMenu;
