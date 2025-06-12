import React from "react";
import { UserProvider } from "./UserProvider";
import { TransactionsProvider } from "./TransactionsProvider";
import { AccountsProvider } from "./AccountsProvider";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <UserProvider>
        <TransactionsProvider>
          <AccountsProvider>{children}</AccountsProvider>
        </TransactionsProvider>
      </UserProvider>
    </>
  );
};

export default AppProviders;
