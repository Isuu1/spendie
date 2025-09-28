//Components
import AccountsTile from "@/features/accounts/components/AccountsTile";
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
    component: AccountsTile,
  },
  {
    name: "Recent transactions",
    component: TransactionsTile,
  },
];
