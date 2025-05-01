"use client";

//Components
import AccountsTile from "@/features/dashboard/components/AccountsTile";
import TotalBalanceTile from "@/features/dashboard/components/TotalBalanceTile";
import TransactionsTile from "@/features/dashboard/components/TransactionsTile";
import { useUser } from "@/shared/providers/UserProvider";

export default function Page() {
  const { user } = useUser();
  console.log("User in dashboard page:", user);
  return (
    <>
      <h1>Dashboard page</h1>
      <AccountsTile />
      <TotalBalanceTile />
      <TransactionsTile />
    </>
  );
}
