//Components
import AccountsPanel from "@/features/accounts/components/AccountsPanel";
import TotalBalanceTile from "@/features/total-balance/components/TotalBalanceTile";
import TransactionsPanel from "@/features/transactions/components/TransactionsPanel";
import type { PanelName } from "./panelsMetaData";

export type PanelDefinition = {
  name: PanelName;
  component: React.ComponentType;
};

export const panelsLibrary: PanelDefinition[] = [
  {
    name: "Total Balance",
    component: TotalBalanceTile,
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
