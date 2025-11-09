"use client";

import React from "react";
//Hooks
import { useUserSettingsClient } from "@/features/user/api/useUserSettingsClient";
//Components
import PanelWrapper from "./PanelWrapper";
import ErrorMessage from "@/shared/components/ErrorMessage";
//Config
import { panelsLibrary } from "@/features/dashboard/config/panelsLibrary";
//Animations
import { AnimatePresence, motion } from "motion/react";

const Dashboard = () => {
  const { data: settings, isFetching, error } = useUserSettingsClient();

  if (error)
    return (
      <ErrorMessage
        variant="dashboard"
        message="Failed to load your account settings from the server."
      />
    );

  const visiblePanels = settings?.visible_panels || [];

  return (
    <motion.div>
      <AnimatePresence>
        {panelsLibrary
          .filter((panel) => visiblePanels.includes(panel.name))
          .map((panel) => {
            const PanelComponent = panel.component;
            return (
              <PanelWrapper key={panel.name} name={panel.name}>
                <PanelComponent />
              </PanelWrapper>
            );
          })}
        {visiblePanels.length === 0 && !isFetching && (
          <p>No panels to display. Please update your settings.</p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard;
