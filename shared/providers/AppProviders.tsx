import React from "react";
import { UserProvider } from "./UserProvider";
import { TransactionsProvider } from "./TransactionsProvider";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <UserProvider>
        <TransactionsProvider>{children}</TransactionsProvider>
      </UserProvider>
    </>
  );
};

export default AppProviders;
