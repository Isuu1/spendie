import React from "react";
//Components
import AccountsList from "./AccountsList";
import ErrorMessage from "@/shared/components/ErrorMessage";
//Hooks
import { useAccountsClient } from "../hooks/useAccountsClient";
import DashboardPanelLoader from "@/features/dashboard/components/DashboardPanelLoader";

export const revalidate = 60;

const AccountsPanel: React.FC = () => {
  const { data: accounts, isLoading, isFetching, error } = useAccountsClient();
  console.log("is loading accounts:", isLoading);
  console.log("is fetching accounts:", isFetching);
  console.log("accounts data:", accounts);

  if (isFetching || isLoading) {
    return <DashboardPanelLoader />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <AccountsList accounts={accounts} />
    </>
  );
};

export default AccountsPanel;
