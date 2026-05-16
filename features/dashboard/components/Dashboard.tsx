"use client";

import { cn } from "@/shared/lib/cn";
//Hooks
import { useUserSettings } from "@/features/user/hooks/useUserSettings";
import { useTogglePanelVisibility } from "@/features/user/hooks/useTogglePanelVisibility";
//Components
import DashboardPanelWrapper from "./DashboardPanelWrapper";
import ErrorMessage from "@/shared/components/ErrorMessage";
import DashboardOptions from "./DashboardOptions";
import Button from "@/shared/components/ui/Button";
//Config
import {
  PanelId,
  panelsLibrary,
} from "@/features/dashboard/config/panelsLibrary";
//Animations
import { AnimatePresence, motion } from "motion/react";

export type DashboardLayoutItem = {
  id: PanelId;
  visible: boolean;
  order: number;
};

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

  const layout: DashboardLayoutItem[] = Array.isArray(
    settings?.dashboard_layout,
  )
    ? settings.dashboard_layout
    : [];

  const toggleAllPanels = () => {
    panelsLibrary.forEach((panel) => {
      togglePanel({ panelId: panel.id, visible: false });
    });
  };

  return (
    <>
      <DashboardOptions />
      <motion.div
        className={cn(
          "grid grid-cols-12 gap-6 items-start",
          layout.length === 0 && "flex columns-1 items-center justify-center",
        )}
      >
        <AnimatePresence>
          {layout.map((panel) => {
            const panelDefinition = panelsLibrary.find(
              (p) => p.id === panel.id,
            );

            //Filter out panels that are not visible
            if (!panel.visible) return null;

            if (!panelDefinition) return null;

            const PanelComponent = panelDefinition.component;

            return (
              <DashboardPanelWrapper
                key={panel.id}
                className={panelDefinition.className}
              >
                <PanelComponent />
              </DashboardPanelWrapper>
            );
          })}
          {layout.length === 0 && (
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
