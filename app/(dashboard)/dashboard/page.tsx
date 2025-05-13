"use client";

import CardsTile from "@/features/dashboard/components/CardsTile";
//Components
//import AccountsTile from "@/features/dashboard/components/AccountsTile";
import TileWrapper from "@/features/dashboard/components/TileWrapper";
import TotalBalanceTile from "@/features/total-balance/components/TotalBalanceTile";
import TransactionsTile from "@/features/dashboard/components/TransactionsTile";
import { useUser } from "@/shared/providers/UserProvider";
//Icons
import { MdAccountBalance } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";
import PlaidLink from "@/shared/components/PlaidLink/PlaidLink";
import AccountsTile from "@/features/dashboard/components/AccountsTile";
import { BsCurrencyExchange } from "react-icons/bs";

export default function Page() {
  const { user } = useUser();
  console.log("User in dashboard page:", user);

  const tilesInUse = [
    {
      name: "Accounts",
      component: <AccountsTile />,
      icon: <MdAccountBalance />,
    },
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
      name: "Recent transactions",
      component: <TransactionsTile />,
      icon: <BsCurrencyExchange />,
    },
  ];

  console.log("User in dashboard page:", user);
  return (
    <>
      <div style={{ display: "none" }}>
        <PlaidLink userId={user?.id} />
      </div>

      {tilesInUse.map((tile) => (
        <TileWrapper key={tile.name} name={tile.name} icon={tile.icon}>
          {tile.component}
        </TileWrapper>
      ))}
    </>
  );
}
