import React from "react";
//Styles
import styles from "./TotalBalancePanel.module.scss";
//Components
import FutureBalance from "./FutureBalance";
import ErrorMessage from "@/shared/components/ErrorMessage";
//Utils
import { getAccountsServer } from "@/features/accounts/api/server";
import { getRecurringPayments } from "@/features/recurring-payments/api/getRecurringPayments";

const TotalBalancePanel: React.FC = async () => {
  const result = await getAccountsServer();

  if (result.error) {
    return <ErrorMessage message={result.error} />;
  }

  const { accounts } = result;

  const { recurringPayments, error } = await getRecurringPayments();

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
        recurringPaymentsError={error}
      />
    </div>
  );
};

export default TotalBalancePanel;
