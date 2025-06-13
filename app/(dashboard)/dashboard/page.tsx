import CardsTile from "@/features/dashboard/components/CardsTile";
//Components
import AccountsTile from "@/features/dashboard/components/AccountsTile";
import TileWrapper from "@/features/dashboard/components/TileWrapper";
import TotalBalanceTile from "@/features/total-balance/components/TotalBalanceTile";
import TransactionsTile from "@/features/dashboard/components/TransactionsTile";
//Icons
import { MdAccountBalance } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";
//import PlaidLink from "@/shared/components/PlaidLink/PlaidLink";

import { BsCurrencyExchange } from "react-icons/bs";

export default async function Page() {
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

  return (
    <>
      {/* <div style={{ display: "none" }}>
        <PlaidLink userId={user?.id} />
      </div> */}

      {tilesInUse.map((tile) => (
        <TileWrapper key={tile.name} name={tile.name} icon={tile.icon}>
          {tile.component}
        </TileWrapper>
      ))}
    </>
  );
}
