import React from "react";
//Components
import AccountsList from "./AccountsList";
import DashboardPanelLoader from "@/features/dashboard/components/DashboardPanelLoader";
//Hooks
import { useAccountsClient } from "../hooks/useAccountsClient";

const AccountsPanel: React.FC = () => {
  const { data: accounts, isLoading } = useAccountsClient();

  if (isLoading) {
    return <DashboardPanelLoader height={215} />;
  }

  return (
    <>
      <AccountsList accounts={accounts || []} />
    </>
  );
};

export default AccountsPanel;
