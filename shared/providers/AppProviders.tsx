import React from "react";
import { QueryProvider } from "./QueryProvider";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryProvider>{children}</QueryProvider>
    </>
  );
};

export default AppProviders;
