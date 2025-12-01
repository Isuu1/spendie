import React from "react";
//Styles
import styles from "./TotalBalancePanel.module.scss";
//Components
import FutureBalance from "../../future-balance/components/FutureBalance";
import DashboardPanelLoader from "@/features/dashboard/components/DashboardPanelLoader";
import SelectInput from "@/shared/components/ui/SelectInput";
//Api
import { useAccountsClient } from "@/features/accounts/hooks/useAccountsClient";
//Animations
import { AnimatePresence } from "motion/react";

const TotalBalancePanel: React.FC = () => {
  const { data, error, isLoading } = useAccountsClient();

  const [futureBalanceVisible, setFutureBalanceVisible] = React.useState(true);

  if (error) {
    console.error("Error fetching accounts data:", error);
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
      <div className={styles.header}>
        <h3>Total Balance</h3>
        <SelectInput
          id="mode"
          selectOptions={["Detailed", "Simple"]}
          value={futureBalanceVisible ? "Detailed" : "Simple"}
          onChange={(option) => setFutureBalanceVisible(option === "Detailed")}
        />
      </div>

      <h1 className={styles.balance}>£{totalBalance ?? 0}</h1>

      <AnimatePresence initial={false}>
        {futureBalanceVisible && <FutureBalance totalBalance={totalBalance} />}
      </AnimatePresence>
    </div>
  );
};

export default TotalBalancePanel;
