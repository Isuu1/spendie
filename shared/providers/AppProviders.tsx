import React from "react";
import { UserProvider } from "./UserProvider";
import { TransactionsProvider } from "./TransactionsProvider";
import { QueryProvider } from "./QueryProvider";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <UserProvider>
        <QueryProvider>
          <TransactionsProvider>{children}</TransactionsProvider>
        </QueryProvider>
      </UserProvider>
    </>
  );
};

export default AppProviders;
