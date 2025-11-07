import React from "react";
//Components
import AccountsList from "./AccountsList";
import ErrorMessage from "@/shared/components/ErrorMessage";
//Hooks
import { useAccountsClient } from "../hooks/useAccountsClient";

export const revalidate = 60;

const AccountsPanel: React.FC = () => {
  const { data, error } = useAccountsClient();

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <AccountsList accounts={data} />
    </>
  );
};

export default AccountsPanel;
