import React from "react";
import { UserProvider } from "./UserProvider";
import { QueryProvider } from "./QueryProvider";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <UserProvider>
        <QueryProvider>{children}</QueryProvider>
      </UserProvider>
    </>
  );
};

export default AppProviders;
