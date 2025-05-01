"use client";

//Components
import AccountsTile from "@/features/dashboard/components/AccountsTile";
import TileWrapper from "@/features/dashboard/components/TileWrapper";
import TotalBalanceTile from "@/features/dashboard/components/TotalBalanceTile";
import TransactionsTile from "@/features/dashboard/components/TransactionsTile";
import { useUser } from "@/shared/providers/UserProvider";

export default function Page() {
  const { user } = useUser();

  const tilesInUse = [
    { name: "Accounts", component: <AccountsTile /> },
    { name: "Total Balance", component: <TotalBalanceTile /> },
    { name: "Transactions", component: <TransactionsTile /> },
  ];

  console.log("User in dashboard page:", user);
  return (
    <>
      {tilesInUse.map((tile) => (
        <TileWrapper key={tile.name} name={tile.name}>
          {tile.component}
        </TileWrapper>
      ))}
    </>
  );
}
