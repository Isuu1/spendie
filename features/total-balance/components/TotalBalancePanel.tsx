import React from "react";
//Styles
import styles from "./TotalBalancePanel.module.scss";
//Components
import FutureBalance from "./FutureBalance";
import ErrorMessage from "@/shared/components/ErrorMessage";
//Api
import { useAccountsClient } from "@/features/accounts/api/useAccountsClient";

const TotalBalancePanel: React.FC = () => {
  const { data, error } = useAccountsClient();

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const totalBalance = data?.reduce(
    (sum: number, currentAccount: { balances: { current: number } }) => {
      const currentBalance = currentAccount.balances.current ?? 0;
      return sum + currentBalance;
    },
    0
  );

  return (
    <div className={styles.totalBalanceTile}>
      <h1 className={styles.balance}>£{totalBalance ?? 0}</h1>

      <FutureBalance
        totalBalance={totalBalance}
        recurringPaymentsError={error}
      />
    </div>
  );
};

export default TotalBalancePanel;
