"use client";

//Components
import AccountsTile from "@/features/dashboard/components/AccountsTile";
import TileWrapper from "@/features/dashboard/components/TileWrapper";
import TotalBalanceTile from "@/features/dashboard/components/TotalBalanceTile";
import TransactionsTile from "@/features/dashboard/components/TransactionsTile";
import { useUser } from "@/shared/providers/UserProvider";
//Icons
import { MdAccountBalance } from "react-icons/md";

export default function Page() {
  const { user } = useUser();

  const tilesInUse = [
    {
      name: "Accounts",
      component: <AccountsTile />,
      icon: <MdAccountBalance />,
    },
    { name: "Total Balance", component: <TotalBalanceTile /> },
    { name: "Transactions", component: <TransactionsTile /> },
  ];

  console.log("User in dashboard page:", user);
  return (
    <>
      {tilesInUse.map((tile) => (
        <TileWrapper key={tile.name} name={tile.name} icon={tile.icon}>
          {tile.component}
        </TileWrapper>
      ))}
    </>
  );
}
