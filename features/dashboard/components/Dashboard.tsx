"use client";

import React from "react";
//Styles
import styles from "./Dashboard.module.scss";
//Hooks
import { useUserSettings } from "@/features/user/hooks/useUserSettings";
//Components
import PanelWrapper from "./PanelWrapper";
import ErrorMessage from "@/shared/components/ErrorMessage";
import DashboardOptions from "./DashboardOptions";
import Button from "@/shared/components/ui/Button";
//Config
import { panelsLibrary } from "@/features/dashboard/config/panelsLibrary";
//Animations
import { AnimatePresence, motion } from "motion/react";
import { useTogglePanelVisibility } from "@/features/user/hooks/useTogglePanelVisibility";

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
      <motion.div className={styles.dashboard}>
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
          {visiblePanels.length === 0 && (
            <div className={styles.emptyState}>
              <h2>Your dashboard is waiting for you</h2>
              <p>
                Choose which panels you want to display and tailor Spendie to
                your needs.
              </p>
              <Button
                variant="primary"
                size="medium"
                onClick={() => toggleAllPanels()}
                className={styles.emptyBtn}
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
