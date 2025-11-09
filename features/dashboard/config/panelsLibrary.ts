import React from "react";
//Components
import TotalBalancePanel from "@/features/total-balance/components/TotalBalancePanel";
import AccountsPanel from "@/features/accounts/components/AccountsPanel";
import TransactionsPanel from "@/features/transactions/components/TransactionsPanel";

export type PanelName = "Total Balance" | "Accounts" | "Recent transactions";

export type PanelDefinition = {
  name: PanelName;
  component: React.ComponentType;
};

export const panelsLibrary: PanelDefinition[] = [
  {
    name: "Total Balance",
    component: TotalBalancePanel,
  },
  {
    name: "Accounts",
    component: AccountsPanel,
  },
  {
    name: "Recent transactions",
    component: TransactionsPanel,
  },
];
