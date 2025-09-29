import React from "react";

//Api
import { getAccountsServer } from "@/features/accounts/api/server";
//Types
import { Account } from "@/shared/types/account";
//Components
import AccountsList from "./AccountsList";
import ErrorMessage from "@/shared/components/ErrorMessage";

const AccountsPanel = async () => {
  const accounts: Account[] = (await getAccountsServer()) ?? [];

  if (accounts.length === 0) {
    return (
      <ErrorMessage message="No accounts found. Please link your bank account." />
    );
  }

  return (
    <>
      <AccountsList accounts={accounts} />
    </>
  );
};

export default AccountsPanel;
