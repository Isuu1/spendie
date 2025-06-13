"use client";

import React from "react";

//Styles
import styles from "./TotalBalanceTile.module.scss";
//Icons
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
//Providers
import { useUser } from "@/shared/providers/UserProvider";
//Utils
import { getLatestStandingOrder } from "../lib/utils";
//Components
import FutureBalance from "./FutureBalance";
import { Account } from "@/shared/types/account";
import { useAccounts } from "@/features/accounts/hooks/useAccounts";

const TotalBalanceTile = () => {
  const accounts = useAccounts().data as Account[] | undefined;
  const { user } = useUser();

  if (!accounts) {
    return <p>Loading...</p>;
  }

  const totalBalance = accounts?.reduce((sum, currentAccount) => {
    const currentBalance = currentAccount.balances.current ?? 0;
    return sum + currentBalance;
  }, 0);

  const latestStandingOrderIncome = getLatestStandingOrder("income", user);
  const latestStandingOrderExpense = getLatestStandingOrder("expense", user);

  return (
    <div className={styles.totalBalanceTile}>
      <h1 className={styles.balance}>£{totalBalance ?? 0}</h1>
      <FutureBalance
        latestStandingOrderIncome={latestStandingOrderIncome}
        latestStandingOrderExpense={latestStandingOrderExpense}
        totalBalance={totalBalance}
      />
      <div className={styles.stats}>
        <h3 className={styles.title}>Incoming changes</h3>
        <div className={styles.income}>
          <div className={styles.label}>
            <FaLongArrowAltUp />
            <p>Income</p>
          </div>
          {latestStandingOrderIncome ? (
            <div className={styles.incomeDetails}>
              <span>{latestStandingOrderIncome.date}</span>
              <span>{latestStandingOrderIncome.name}</span>
              <span>{latestStandingOrderIncome.amount}£</span>
            </div>
          ) : (
            <div className={styles.incomeDetails}>
              <span>No standing orders set up</span>
            </div>
          )}
        </div>
        <div className={styles.expense}>
          <div className={styles.label}>
            <FaLongArrowAltDown />
            <p>Expense</p>
          </div>
          {latestStandingOrderExpense ? (
            <div className={styles.incomeDetails}>
              <span>{latestStandingOrderExpense.date}</span>
              <span>{latestStandingOrderExpense.name}</span>
              <span>{latestStandingOrderExpense.amount}£</span>
            </div>
          ) : (
            <div className={styles.incomeDetails}>
              <span>No standing orders set up</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalBalanceTile;
