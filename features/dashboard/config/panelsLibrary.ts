//Components
const AccountsPanel = dynamic(
  () => import("@/features/accounts/components/AccountsPanel")
);
const TransactionsPanel = dynamic(
  () => import("@/features/transactions/components/TransactionsPanel")
);
const TotalBalancePanel = dynamic(
  () => import("@/features/total-balance/components/TotalBalancePanel")
);
//Types
import type { PanelName } from "./panelsMetaData";
import dynamic from "next/dynamic";

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
