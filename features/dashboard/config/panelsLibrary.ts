import React from "react";
//Components
import TotalBalancePanel from "@/features/total-balance/components/TotalBalancePanel";
import AccountsPanel from "@/features/accounts/components/AccountsPanel";
import TransactionsPanel from "@/features/transactions/components/TransactionsPanel";

export type PanelId = "total-balance" | "accounts" | "transactions";

export type PanelName = "Total Balance" | "Accounts" | "Transactions";

export type PanelDefinition = {
  id: PanelId;
  name: PanelName;
  component: React.ComponentType;
  className: string;
};

export const panelsLibrary: PanelDefinition[] = [
  {
    id: "total-balance",
    name: "Total Balance",
    component: TotalBalancePanel,
    className: "col-span-12 lg:col-span-4",
  },
  {
    id: "accounts",
    name: "Accounts",
    component: AccountsPanel,
    className: "col-span-12 lg:col-span-4",
  },
  {
    id: "transactions",
    name: "Transactions",
    component: TransactionsPanel,
    className: "col-span-12 lg:col-span-7",
  },
];
