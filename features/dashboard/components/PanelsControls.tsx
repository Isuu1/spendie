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
import { panelsMetaData } from "../config/panelsMetaData";

interface PanelsControlsProps {
  settings: UserSettings;
}

const PanelsControls: React.FC<PanelsControlsProps> = ({ settings }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const isTileActive = (tileName: string) => {
    return settings?.visible_tiles?.includes(tileName);
  };

  const handleChange = async (tileName: string, isActive: boolean) => {
    const result = await changeUserSettings(tileName, isActive);
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
          {panelsMetaData.map((tile) => (
            <li key={tile.name}>
              <Button
                text={isTileActive(tile.name) ? "Active" : "Inactive"}
                variant={isTileActive(tile.name) ? "primary" : "secondary"}
                size="small"
                onClick={() =>
                  handleChange(tile.name, !isTileActive(tile.name))
                }
              />
              {tile.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PanelsControls;
