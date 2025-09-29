//Components
import AccountsPanel from "@/features/accounts/components/AccountsPanel";
import TotalBalanceTile from "@/features/total-balance/components/TotalBalanceTile";
import TransactionsTile from "@/features/transactions/components/TransactionsTile";
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
    component: TransactionsTile,
  },
];
