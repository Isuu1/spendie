import React from "react";
//Styles
import styles from "./TotalBalancePanel.module.scss";
//Components
import FutureBalance from "./FutureBalance";
import ErrorMessage from "@/shared/components/ErrorMessage";
//Api
import { useAccountsClient } from "@/features/accounts/hooks/useAccountsClient";
import DashboardPanelLoader from "@/features/dashboard/components/DashboardPanelLoader";

const TotalBalancePanel: React.FC = () => {
  const { data, error, isLoading } = useAccountsClient();

  if (error) {
    return <ErrorMessage variant="panel" message={error.message} />;
  }

  if (isLoading) {
    return <DashboardPanelLoader height={218} />;
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
