"use client";

import React from "react";
//Styles
import styles from "./PanelsControls.module.scss";
//Components
import Button from "@/shared/components/ui/Button";
//Icons
import { MdDashboardCustomize } from "react-icons/md";
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

interface PanelsControlsProps {
  settings: UserSettings;
}

const PanelsControls: React.FC<PanelsControlsProps> = ({ settings }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const isPanelActive = (panelName: PanelName) => {
    return settings?.visible_panels?.includes(panelName);
  };

  const handleChange = async (panelName: PanelName, isActive: boolean) => {
    const result = await togglePanelVisibility(panelName, isActive);
    console.log("Change Result:", result);
  };

  return (
    <div className={styles.dashboardControls}>
      <Button
        text="Tiles"
        variant="secondary"
        size="medium"
        icon={<MdDashboardCustomize />}
        onClick={() => setMenuOpen(!menuOpen)}
      />
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
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

export default PanelsControls;
