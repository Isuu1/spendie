import React from "react";
//Styles
import styles from "./TotalBalancePanel.module.scss";
//Components
import FutureBalance from "../../future-balance/components/FutureBalance";
import DashboardPanelLoader from "@/features/dashboard/components/DashboardPanelLoader";
import SelectInput from "@/shared/components/ui/SelectInput";
//Api
import { useAccounts } from "@/features/accounts/hooks/useAccounts";
//Animations
import { AnimatePresence } from "motion/react";
import { Account } from "@/features/accounts/types/account";

const TotalBalancePanel: React.FC = () => {
  const { data = [], isLoading } = useAccounts();

  const [futureBalanceVisible, setFutureBalanceVisible] = React.useState(true);

  if (isLoading) {
    return <DashboardPanelLoader height={218} />;
  }

  const totalBalance = data?.reduce((sum: number, currentAccount: Account) => {
    const currentBalance = currentAccount.current_balance ?? 0;
    return sum + currentBalance;
  }, 0);

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
