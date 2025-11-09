import React from "react";
//Components
import AccountsList from "./AccountsList";
import ErrorMessage from "@/shared/components/ErrorMessage";
import DashboardPanelLoader from "@/features/dashboard/components/DashboardPanelLoader";
//Hooks
import { useAccountsClient } from "../hooks/useAccountsClient";

const AccountsPanel: React.FC = () => {
  const { data: accounts, isLoading, refetch, error } = useAccountsClient();

  if (isLoading) {
    return <DashboardPanelLoader height={215} />;
  }

  if (error) {
    return (
      <ErrorMessage
        onReload={refetch}
        variant="panel"
        message="Error loading accounts"
      />
    );
  }

  return (
    <>
      <AccountsList accounts={accounts} />
    </>
  );
};

export default AccountsPanel;
