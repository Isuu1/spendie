import React from "react";
//Api
import { getAccountsServer } from "@/features/accounts/api/server";
//Components
import AccountsList from "./AccountsList";
import ErrorMessage from "@/shared/components/ErrorMessage";

export const revalidate = 60;

const AccountsPanel: React.FC = async () => {
  const result = await getAccountsServer();

  if (result.error) {
    return <ErrorMessage message={result.error} />;
  }

  const { accounts } = result;

  return (
    <>
      <AccountsList accounts={accounts} />
    </>
  );
};

export default AccountsPanel;
