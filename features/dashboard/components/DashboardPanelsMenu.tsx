"use client";

import React, { useRef } from "react";
//Config
import { PanelId, panelsLibrary } from "../config/panelsLibrary";
//Hooks
import { useUserSettings } from "@/features/user/hooks/useUserSettings";
import { useTogglePanelVisibility } from "@/features/user/hooks/useTogglePanelVisibility";
//Components
import Switcher from "@/shared/components/ui/Switcher";

const DashboardPanelsMenu = () => {
  const { data: settings } = useUserSettings();

  const {
    mutate: togglePanel,
    isPending,
    variables,
  } = useTogglePanelVisibility();

  const visiblePanels = settings?.dashboard_layout
    ? settings.dashboard_layout
        .filter((panel) => panel.visible)
        .map((panel) => panel.id)
    : [];

  const panelMenuRef = useRef<HTMLUListElement>(null);

  const isPanelActive = (panelId: PanelId) => {
    return visiblePanels.includes(panelId);
  };

  const handleChange = (panelId: PanelId) => {
    togglePanel({ panelId, visible: isPanelActive(panelId) });
  };

  return (
    <ul
      ref={panelMenuRef}
      className="list-none flex flex-col gap-3 whitespace-nowrap radius-md"
    >
      {panelsLibrary.map((panel) => (
        <li className="flex items-center gap-2 text-white" key={panel.name}>
          <Switcher
            value={!isPanelActive(panel.id)}
            onChange={() => handleChange(panel.id)}
            isPending={isPending && variables?.panelId === panel.id}
          />
          <span>{panel.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default DashboardPanelsMenu;
