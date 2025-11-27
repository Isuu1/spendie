import React from "react";
//Styles
import styles from "./TotalBalancePanel.module.scss";
//Components
import FutureBalance from "../../future-balance/components/FutureBalance";
import DashboardPanelLoader from "@/features/dashboard/components/DashboardPanelLoader";
//Api
import { useAccountsClient } from "@/features/accounts/hooks/useAccountsClient";
import Switcher from "@/shared/components/ui/Switcher";
import { AnimatePresence } from "motion/react";

const TotalBalancePanel: React.FC = () => {
  const { data, error, isLoading } = useAccountsClient();

  const [futureBalanceVisible, setFutureBalanceVisible] = React.useState(true);

  console.log("active", futureBalanceVisible);

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
      <h1 className={styles.balance}>£{totalBalance ?? 0}</h1>
      <div className={styles.switcherContainer}>
        <p>
          {futureBalanceVisible
            ? "Collapse upcoming changes"
            : "Expand upcoming changes"}
        </p>
        <Switcher
          value={!futureBalanceVisible}
          onChange={() => setFutureBalanceVisible(!futureBalanceVisible)}
        />
      </div>
      <AnimatePresence initial={false}>
        {futureBalanceVisible && (
          <FutureBalance
            active={futureBalanceVisible}
            totalBalance={totalBalance}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TotalBalancePanel;
