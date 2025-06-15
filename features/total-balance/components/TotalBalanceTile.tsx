import React from "react";

//Styles
import styles from "./TotalBalanceTile.module.scss";
//Utils
import { getSoonestRecurringPayment } from "../lib/utils";
//Components
import FutureBalance from "./FutureBalance";
import { Account } from "@/shared/types/account";
import { getAccountsServer } from "@/features/accounts/api/server";
import UpcomingChange from "./UpcomingChange";

const TotalBalanceTile = async () => {
  const accounts = (await getAccountsServer()) as Account[];

  if (!accounts) {
    return <p>Loading...</p>;
  }

  const totalBalance = accounts?.reduce((sum, currentAccount) => {
    const currentBalance = currentAccount.balances.current ?? 0;
    return sum + currentBalance;
  }, 0);

  const soonestRecurringIncome = await getSoonestRecurringPayment("income");

  const soonestRecurringExpense = await getSoonestRecurringPayment("expense");

  return (
    <div className={styles.totalBalanceTile}>
      <h1 className={styles.balance}>£{totalBalance ?? 0}</h1>
      <FutureBalance
        latestStandingOrderIncome={soonestRecurringIncome}
        latestStandingOrderExpense={soonestRecurringExpense}
        totalBalance={totalBalance}
      />
      <div className={styles.upcomingChanges}>
        <h3 className={styles.title}>Upcoming changes</h3>
        <UpcomingChange type="income" data={soonestRecurringIncome} />
        <UpcomingChange type="expense" data={soonestRecurringExpense} />
      </div>
    </div>
  );
};

export default TotalBalanceTile;
