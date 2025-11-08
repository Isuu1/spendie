import React from "react";
//Components
import AccountsList from "./AccountsList";
import ErrorMessage from "@/shared/components/ErrorMessage";
import DashboardPanelLoader from "@/features/dashboard/components/DashboardPanelLoader";
//Hooks
import { useAccountsClient } from "../hooks/useAccountsClient";

const AccountsPanel: React.FC = () => {
  const { data: accounts, isLoading, isFetching, error } = useAccountsClient();
  console.log("is loading accounts:", isLoading);
  console.log("is fetching accounts:", isFetching);
  console.log("accounts data:", accounts);

  if (isFetching || isLoading) {
    return <DashboardPanelLoader />;
  }

  if (error) {
    return <ErrorMessage variant="panel" message={error.message} />;
  }

  return (
    <>
      <AccountsList accounts={accounts} />
    </>
  );
};

export default AccountsPanel;
