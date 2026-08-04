import React from "react";
import dayjs from "dayjs";
//Components
import FutureBalance from "../../future-balance/components/FutureBalance";
import DashboardPanelLoader from "@/features/dashboard/components/DashboardPanelLoader";
//Hooks
import { useAccounts } from "@/features/accounts/hooks/useAccounts";
import { useTransactions } from "@/features/transactions/hooks/useTransactions";
//Types
import { Account } from "@/features/accounts/types/account";
//Utils
import { calculateFinancialSummary } from "@/features/transactions/lib/utils/calculateFinancialSummary";
import { getTransactionsInPeriod } from "@/features/transactions/lib/utils/getTransactionsInPeriod";
//Context
import { FutureBalanceProvider } from "@/features/future-balance/context/FutureBalanceContext";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Amount } from "@/shared/components/Amount";

const TotalBalancePanel = () => {
  const { data = [], isLoading } = useAccounts();

  const { data: transactions = [] } = useTransactions();

  if (isLoading) {
    return <DashboardPanelLoader height={218} />;
  }

  const totalBalance = data?.reduce((sum: number, currentAccount: Account) => {
    if (currentAccount.is_disconnected) {
      return sum;
    }
    const currentBalance = currentAccount.current_balance ?? 0;
    return sum + currentBalance;
  }, 0);

  const startOfMonth = dayjs().startOf("month").toDate();
  const endOfMonth = dayjs().endOf("month").toDate();

  const currentMonthTransactions = getTransactionsInPeriod(
    transactions,
    startOfMonth,
    endOfMonth,
  );

  const { income, expenses } = calculateFinancialSummary(
    currentMonthTransactions,
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center gap-5">
        <h4 className="text-secondary">Total Balance</h4>
      </div>

      <Amount amount={totalBalance ?? 0} className="text-2xl font-semibold" />

      <div className="flex flex-row gap-6 justify-between items-center">
        <p className="text-secondary">This month</p>
        <div className="flex flex-row gap-3">
          <p className="flex items-center gap-1 text-green-600">
            <ChevronUp size={17} />
            <Amount amount={income} />
          </p>
          <div className="flex items-center gap-1 text-red-600">
            <ChevronDown size={17} />
            <Amount amount={expenses} />
          </div>
        </div>
      </div>

      <FutureBalanceProvider totalBalance={totalBalance ?? 0}>
        <FutureBalance />
      </FutureBalanceProvider>
    </div>
  );
};

export default TotalBalancePanel;
