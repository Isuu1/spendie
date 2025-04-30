//Components
import AccountsTile from "@/features/dashboard/components/AccountsTile";
import TotalBalanceTile from "@/features/dashboard/components/TotalBalanceTile";
import TransactionsTile from "@/features/dashboard/components/TransactionsTile";

export default function Page() {
  return (
    <div>
      <h1>Dashboard page</h1>
      <AccountsTile />
      <TotalBalanceTile />
      <TransactionsTile variant="light" />
    </div>
  );
}
