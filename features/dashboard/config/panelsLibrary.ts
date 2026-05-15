import React from "react";
//Components
import TotalBalancePanel from "@/features/total-balance/components/TotalBalancePanel";
import AccountsPanel from "@/features/accounts/components/AccountsPanel";
import TransactionsPanel from "@/features/transactions/components/TransactionsPanel";

export type PanelName = "Total Balance" | "Accounts" | "Recent transactions";

export type PanelDefinition = {
  name: PanelName;
  component: React.ComponentType;
  className?: string;
};

export const panelsLibrary: PanelDefinition[] = [
  {
    name: "Total Balance",
    component: TotalBalancePanel,
    className: "col-span-12 lg:col-span-4",
  },
  {
    name: "Accounts",
    component: AccountsPanel,
    className: "col-span-12 lg:col-span-4",
  },
  {
    name: "Recent transactions",
    component: TransactionsPanel,
    className: "col-span-12 lg:col-span-12",
  },
];
