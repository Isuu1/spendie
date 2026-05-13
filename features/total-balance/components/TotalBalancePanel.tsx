import React from "react";
import dayjs from "dayjs";
//Components
import FutureBalance from "../../future-balance/components/FutureBalance";
import DashboardPanelLoader from "@/features/dashboard/components/DashboardPanelLoader";
import SelectInput from "@/shared/components/ui/SelectInput";
//Hooks
import { useAccounts } from "@/features/accounts/hooks/useAccounts";
import { useTransactions } from "@/features/transactions/hooks/useTransactions";
//Animations
import { AnimatePresence } from "motion/react";
//Types
import { Account } from "@/features/accounts/types/account";
//Utils
import { calculateFinancialSummary } from "@/features/transactions/lib/utils/calculateFinancialSummary";
import { getTransactionsInPeriod } from "@/features/transactions/lib/utils/getTransactionsInPeriod";

const selectOptions = [
  { label: "Detailed", value: "Detailed" },
  { label: "Simple", value: "Simple" },
];

const TotalBalancePanel: React.FC = () => {
  const [futureBalanceVisible, setFutureBalanceVisible] = React.useState(true);

  const { data = [], isLoading, isFetching } = useAccounts();

  console.log("is loading accounts", isLoading);
  console.log("is fetching accounts", isFetching);

  const { data: transactions = [] } = useTransactions();

  if (isLoading || isFetching) {
    return <DashboardPanelLoader height={218} />;
  }

  const totalBalance = data?.reduce((sum: number, currentAccount: Account) => {
    const currentBalance = currentAccount.current_balance ?? 0;
    return sum + currentBalance;
  }, 0);

  const startOfMonth = dayjs().startOf("month").toDate();
  const endOfMonth = dayjs().endOf("month").toDate();

  const thisMonthTransactions = getTransactionsInPeriod(
    transactions,
    startOfMonth,
    endOfMonth,
  );

  const { income, expenses } = calculateFinancialSummary(thisMonthTransactions);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center gap-5">
        <h4 className="text-secondary">Total Balance</h4>
        <SelectInput
          id="mode"
          selectOptions={selectOptions}
          value={
            futureBalanceVisible
              ? selectOptions[0].label
              : selectOptions[1].label
          }
          onChange={(option) => setFutureBalanceVisible(option === "Detailed")}
          className="w-fit"
        />
      </div>

      <h2>£{totalBalance ?? 0}</h2>

      <div className="flex flex-row gap-6 justify-between">
        <p>This month</p>
        <div className="flex flex-row gap-3">
          <p className="text-green-500">+£{income}</p>
          <p className="text-red-500">-£{expenses}</p>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {futureBalanceVisible && <FutureBalance totalBalance={totalBalance} />}
      </AnimatePresence>
    </div>
  );
};

export default TotalBalancePanel;
