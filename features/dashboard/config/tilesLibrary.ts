//Components
import AccountsTile from "@/features/accounts/components/AccountsTile";
import TotalBalanceTile from "@/features/total-balance/components/TotalBalanceTile";
import TransactionsTile from "@/features/transactions/components/TransactionsTile";

export const tilesLibrary = [
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
