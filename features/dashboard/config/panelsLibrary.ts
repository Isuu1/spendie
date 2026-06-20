import React from "react";
//Components
import TotalBalancePanel from "@/features/total-balance/components/TotalBalancePanel";
import AccountsPanel from "@/features/accounts/components/AccountsPanel";
import TransactionsPanel from "@/features/transactions/components/TransactionsPanel";
import IncomePanel from "@/features/income/IncomePanel";

export type PanelId = "total-balance" | "accounts" | "transactions" | "income";

export type PanelName =
  | "Total Balance"
  | "Accounts"
  | "Transactions"
  | "Income";

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
    id: "income",
    name: "Income",
    component: IncomePanel,
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
