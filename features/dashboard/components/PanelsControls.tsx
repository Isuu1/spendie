"use client";

import React from "react";
//Styles
import styles from "./PanelsControls.module.scss";
import Button from "@/shared/components/ui/Button";
import { MdDashboardCustomize } from "react-icons/md";
import { changeUserSettings } from "../changeUserSettings";
import { getUserSettingsClient } from "@/features/user/api/getUserSettingsClient";
import { UserSettings } from "@/features/user/types/user";

const PanelsControls = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [userSettings, setUserSettings] = React.useState<UserSettings | null>(
    null
  );

  React.useEffect(() => {
    const fetchData = async () => {
      const { settings, error } = await getUserSettingsClient();
      if (error) {
        console.error("Error fetching user settings:", error);
        return;
      }
      setUserSettings(settings);
    };
    fetchData();
  }, []);

  console.log(userSettings);

  const isTileActive = (tileName: string) => {
    return userSettings?.visible_tiles?.includes(tileName);
  };

  const handleChange = async (tileName: string, isActive: boolean) => {
    const result = await changeUserSettings(tileName, isActive);
    console.log("Change Result:", result);
  };
  // Update local state to reflect the change

  const tilesLibrary = [
    { name: "Accounts", component: null },
    { name: "Recent transactions", component: null },
    { name: "Total Balance", component: null },
  ];

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
          {tilesLibrary.map((tile) => (
            <li key={tile.name}>
              <Button
                text={isTileActive(tile.name) ? "Active" : "Inactive"}
                variant={isTileActive(tile.name) ? "primary" : "secondary"}
                size="small"
                onClick={() =>
                  handleChange(tile.name, !!isTileActive(tile.name))
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
