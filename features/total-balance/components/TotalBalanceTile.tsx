import React from "react";
//Styles
import styles from "./TotalBalanceTile.module.scss";
//Components
import FutureBalance from "./FutureBalance";
//Types
import { Account } from "@/shared/types/account";
import { RecurringPayment } from "@/shared/types/recurring-payment";
//Utils
import { getAccountsServer } from "@/features/accounts/api/server";
import { getRecurringPayments } from "@/features/recurring-payments/api/getRecurringPayments";

const TotalBalanceTile: React.FC = async () => {
  const accounts = (await getAccountsServer()) as Account[];

  const recurringPayments =
    (await getRecurringPayments()) as RecurringPayment[];

  if (!accounts) {
    return <div className={styles.totalBalanceTile}>No accounts found</div>;
  }

  const totalBalance = accounts?.reduce((sum, currentAccount) => {
    const currentBalance = currentAccount.balances.current ?? 0;
    return sum + currentBalance;
  }, 0);

  return (
    <div className={styles.totalBalanceTile}>
      <h1 className={styles.balance}>£{totalBalance ?? 0}</h1>
      <FutureBalance
        totalBalance={totalBalance}
        recurringPayments={recurringPayments}
      />
    </div>
  );
};

export default TotalBalanceTile;
