"use client";

import React, { useRef } from "react";
//Config
import { PanelName, panelsLibrary } from "../config/panelsLibrary";
//Styles
import styles from "./DashboardPanelsMenu.module.scss";
//Hooks
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { useUserSettings } from "@/features/user/hooks/useUserSettings";
import { useTogglePanelVisibility } from "@/features/user/hooks/useTogglePanelVisibility";
import Switcher from "@/shared/components/ui/Switcher";

interface DashboardPanelsMenuProps {
  onClose: () => void;
}

const DashboardPanelsMenu: React.FC<DashboardPanelsMenuProps> = ({
  onClose,
}) => {
  const { data: settings } = useUserSettings();

  const { mutate: togglePanel, isPending } = useTogglePanelVisibility();

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
    <ul ref={panelMenuRef} className={styles.menu}>
      {panelsLibrary.map((panel) => (
        <li className={styles.menuItem} key={panel.name}>
          <Switcher
            value={!isPanelActive(panel.name)}
            onChange={() =>
              handleChange(panel.name, !!isPanelActive(panel.name))
            }
            isPending={isPending}
          />
          <span className={styles.panelName}>{panel.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default DashboardPanelsMenu;
