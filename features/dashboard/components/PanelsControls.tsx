"use client";

import React from "react";
//Styles
import styles from "./PanelsControls.module.scss";
//Components
import Button from "@/shared/components/ui/Button";
//Icons
import { MdDashboardCustomize } from "react-icons/md";
//Utils
import { changeUserSettings } from "../../user/actions/changeUserSettings";
//Types
import { UserSettings } from "@/features/user/types/user";
//Config
import { PanelName, panelsMetaData } from "../config/panelsMetaData";

interface PanelsControlsProps {
  settings: UserSettings;
}

const PanelsControls: React.FC<PanelsControlsProps> = ({ settings }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const isPanelActive = (panelName: PanelName) => {
    return settings?.visible_panels?.includes(panelName);
  };

  const handleChange = async (panelName: PanelName, isActive: boolean) => {
    const result = await changeUserSettings(panelName, isActive);
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
      {menuOpen && (
        <ul className={styles.menu}>
          {panelsMetaData.map((panel) => (
            <li key={panel.name}>
              <Button
                text={isPanelActive(panel.name) ? "Active" : "Inactive"}
                variant={isPanelActive(panel.name) ? "primary" : "secondary"}
                size="small"
                onClick={() =>
                  handleChange(panel.name, !isPanelActive(panel.name))
                }
              />
              {panel.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PanelsControls;
