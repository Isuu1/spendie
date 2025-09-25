//Components
import AccountsTile from "@/features/accounts/components/AccountsTile";
import TotalBalanceTile from "@/features/total-balance/components/TotalBalanceTile";
import TransactionsTile from "@/features/transactions/components/TransactionsTile";

export type TileDefinition = {
  name: "Total Balance" | "Accounts" | "Recent transactions"; // literal union
  component: React.ComponentType;
};

export const tilesLibrary: TileDefinition[] = [
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
