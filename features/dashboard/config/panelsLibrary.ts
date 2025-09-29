//Components
import AccountsPanel from "@/features/accounts/components/AccountsPanel";
import TotalBalancePanel from "@/features/total-balance/components/TotalBalancePanel";
import TransactionsPanel from "@/features/transactions/components/TransactionsPanel";
import type { PanelName } from "./panelsMetaData";

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
