"use client";

import TotalBalancePanel from "@/features/total-balance/components/TotalBalancePanel";
import { useUserSettingsClient } from "@/features/user/api/useUserSettingsClient";
import React from "react";
import PanelWrapper from "./PanelWrapper";
import ErrorMessage from "@/shared/components/ErrorMessage";
import AccountsPanel from "@/features/accounts/components/AccountsPanel";
//Config
//import { panelsLibrary } from "@/features/dashboard/config/panelsLibrary";

export const panelsLibrary = [
  {
    name: "Total Balance",
    component: TotalBalancePanel,
  },
  {
    name: "Accounts",
    component: AccountsPanel,
  },
  //   {
  //     name: "Recent transactions",
  //     component: TransactionsPanel,
  //   },
];

const Dashboard = () => {
  const { data, isLoading, error } = useUserSettingsClient();

  if (error)
    return (
      <ErrorMessage message="Failed to load your account settings from the server." />
    );

  const visiblePanels = data?.visible_panels || [];
  console.log("User Settings Data:", data);
  console.log("Loading State:", isLoading);
  console.log("Error State:", error);
  return (
    <div>
      {panelsLibrary
        .filter((panel) => visiblePanels.includes(panel.name))
        .map((panel) => {
          const PanelComponent = panel.component;
          return (
            <PanelWrapper key={panel.name} name={panel.name}>
              {/* <Suspense fallback={<DashboardPanelLoader />}> */}
              <PanelComponent />
              {/* </Suspense> */}
            </PanelWrapper>
          );
        })}
      {visiblePanels.length === 0 && (
        <p>No panels to display. Please update your settings.</p>
      )}
    </div>
  );
};

export default Dashboard;
