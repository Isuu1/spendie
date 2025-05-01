"use client";

import CardsTile from "@/features/dashboard/components/CardsTile";
//Components
//import AccountsTile from "@/features/dashboard/components/AccountsTile";
import TileWrapper from "@/features/dashboard/components/TileWrapper";
import TotalBalanceTile from "@/features/dashboard/components/TotalBalanceTile";
import TransactionsTile from "@/features/dashboard/components/TransactionsTile";
import { useUser } from "@/shared/providers/UserProvider";
//Icons
import { MdAccountBalance } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";

export default function Page() {
  const { user } = useUser();

  const tilesInUse = [
    // {
    //   name: "Accounts",
    //   component: <AccountsTile />,
    //   icon: <MdAccountBalance />,
    // },
    {
      name: "Cards",
      component: <CardsTile />,
      icon: <FaCreditCard />,
    },
    {
      name: "Total Balance",
      component: <TotalBalanceTile />,
      icon: <MdAccountBalance />,
    },
    {
      name: "Transactions",
      component: <TransactionsTile />,
      icon: <MdAccountBalance />,
    },
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
