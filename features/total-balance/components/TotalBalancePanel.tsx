import React, { useState } from "react";
import dayjs from "dayjs";
//Components
import FutureBalance from "../../future-balance/components/FutureBalance";
import DashboardPanelLoader from "@/features/dashboard/components/DashboardPanelLoader";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Button from "@/shared/components/ui/Button";
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

const TotalBalancePanel = () => {
  const [selectedMode, setSelectedMode] = useState<"detailed" | "overview">(
    "detailed",
  );

  const [open, setOpen] = useState(false);

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

  const handleModeChange = (option: string) => {
    setSelectedMode(option === "Detailed" ? "detailed" : "overview");
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center gap-5">
        <h4 className="text-secondary">Total Balance</h4>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              size="default"
              variant="secondary"
              className="bg-background font-normal aria-expanded:bg-background"
            >
              {selectedMode === "detailed" ? "Detailed" : "Overview"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-background w-auto p-1 gap-1">
            <Button
              className="bg-transparent hover:bg-card text-primary font-normal"
              size="default"
              onClick={() => handleModeChange("Detailed")}
            >
              Detailed
            </Button>
            <Button
              className="bg-transparent hover:bg-card text-primary font-normal"
              size="default"
              onClick={() => handleModeChange("Overview")}
            >
              Overview
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      <h2>£{totalBalance ?? 0}</h2>

      <div className="flex flex-row gap-6 justify-between items-center">
        <p className="text-secondary">This month</p>
        <div className="flex flex-row gap-3">
          <p className="text-primary px-2.5 py-1 bg-green-600/60 rounded-full">
            +£{income}
          </p>
          <p className="text-primary px-2.5 py-1 bg-red-600/60 rounded-full">
            -£{expenses}
          </p>
        </div>
      </div>

      <FutureBalanceProvider totalBalance={totalBalance ?? 0}>
        <FutureBalance selectedMode={selectedMode} />
      </FutureBalanceProvider>
    </div>
  );
};

export default TotalBalancePanel;
