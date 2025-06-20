//Components
import AccountsTile from "@/features/accounts/components/AccountsTile";
import TileWrapper from "@/features/dashboard/components/TileWrapper";
import TotalBalanceTile from "@/features/total-balance/components/TotalBalanceTile";
import TransactionsTile from "@/features/transactions/components/TransactionsTile";
//Icons
import { MdAccountBalance } from "react-icons/md";
//import PlaidLink from "@/shared/components/PlaidLink/PlaidLink";

import { BsCurrencyExchange } from "react-icons/bs";

export default async function Page() {
  const tilesInUse = [
    {
      name: "Total Balance",
      component: <TotalBalanceTile />,
      icon: <MdAccountBalance />,
    },
    {
      name: "Accounts",
      component: <AccountsTile />,
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
