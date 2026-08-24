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
import { calculateBalances } from "../lib/calculateBalances";

const TotalBalancePanel = () => {
  const { data = [], isLoading } = useAccounts();

  const { data: transactions = [] } = useTransactions();

  if (isLoading) {
    return <DashboardPanelLoader height={218} />;
  }

  const { active, hidden } = calculateBalances(data as Account[]);

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
      <div className="flex gap-2 justify-between items-center">
        <Amount amount={active ?? 0} className="text-2xl font-semibold" />
        <div className="flex gap-2">
          <p className="text-sm text-secondary">Hidden accounts:</p>
          <Amount amount={hidden ?? 0} className="text-sm text-secondary" />
        </div>
      </div>

      <div className="flex flex-row gap-6 justify-between items-center">
        <p className="text-secondary">This month</p>
        <div className="flex flex-row gap-3">
          <p className="flex items-center gap-1 text-green-600 font-semibold">
            <ChevronUp size={17} />
            <Amount amount={income} />
          </p>
          <div className="flex items-center gap-1 text-red-600 font-semibold">
            <ChevronDown size={17} />
            <Amount amount={expenses} />
          </div>
        </div>
      </div>

      <FutureBalanceProvider totalBalance={active ?? 0}>
        <FutureBalance />
      </FutureBalanceProvider>
    </div>
  );
};

export default TotalBalancePanel;
