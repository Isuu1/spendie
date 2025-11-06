import React from "react";
//Styles
import styles from "./TotalBalancePanel.module.scss";
//Components
//import FutureBalance from "./FutureBalance";
import ErrorMessage from "@/shared/components/ErrorMessage";
//Utils
// import { getAccountsServer } from "@/features/accounts/api/server";
// import { getRecurringPayments } from "@/features/recurring-payments/api/getRecurringPayments";
// import { getPaymentsHistory } from "@/features/recurring-payments/api/getPaymentsHistory";
import { useAccountsClient } from "@/features/accounts/api/useAccountsClient";

const TotalBalancePanel: React.FC = () => {
  // const result = await getAccountsServer();

  // if (result.error) {
  //   return <ErrorMessage message={result.error} />;
  // }

  // const { accounts } = result;
  const { data, error } = useAccountsClient();
  console.log("Accounts Data:", data);
  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  // const { recurringPayments, error: recurringPaymentsError } =
  //   await getRecurringPayments();

  // const { paymentsHistory, error: paymentHistoryError } =
  //   await getPaymentsHistory();

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

      {/* <FutureBalance
        totalBalance={totalBalance}
        recurringPayments={recurringPayments}
        recurringPaymentsError={recurringPaymentsError || paymentHistoryError}
        paymentsHistory={paymentsHistory}
      /> */}
    </div>
  );
};

export default TotalBalancePanel;
