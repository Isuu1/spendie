"use client";

import React from "react";
import { cn } from "@/shared/lib/cn";
//Hooks
import { useUserSettings } from "@/features/user/hooks/useUserSettings";
import { useTogglePanelVisibility } from "@/features/user/hooks/useTogglePanelVisibility";
//Components
import PanelWrapper from "./PanelWrapper";
import ErrorMessage from "@/shared/components/ErrorMessage";
import DashboardOptions from "./DashboardOptions";
import Button from "@/shared/components/ui/Button";
//Config
import { panelsLibrary } from "@/features/dashboard/config/panelsLibrary";
//Animations
import { AnimatePresence, motion } from "motion/react";

const Dashboard = () => {
  const { data: settings, error } = useUserSettings();
  const { mutate: togglePanel } = useTogglePanelVisibility();

  if (error)
    return (
      <ErrorMessage
        variant="dashboard"
        message="Failed to load your account settings from the server."
      />
    );

  const visiblePanels = settings?.visible_panels || [];

  const toggleAllPanels = () => {
    panelsLibrary.forEach((panel) => {
      togglePanel({ panelName: panel.name, isActive: false });
    });
  };

  return (
    <>
      <DashboardOptions />
      <motion.div
        className={cn(
          "grow columns-sm",
          visiblePanels.length === 0 &&
            "flex columns-1 items-center justify-center",
        )}
      >
        <AnimatePresence>
          {panelsLibrary
            .filter((panel) => visiblePanels.includes(panel.name))
            .map((panel) => {
              const PanelComponent = panel.component;
              return (
                <PanelWrapper key={panel.name}>
                  <PanelComponent />
                </PanelWrapper>
              );
            })}
          {visiblePanels.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <h2>Your dashboard is waiting for you</h2>
              <p>
                Choose which panels you want to display and tailor Spendie to
                your needs.
              </p>
              <Button
                variant="default"
                size="default"
                onClick={() => toggleAllPanels()}
              >
                Show all panels
              </Button>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Dashboard;
