"use client";

import React, { useState } from "react";
import { Dayjs } from "dayjs";
import Link from "next/link";
//Components
import SelectMode from "@/features/future-balance/components/SelectMode";
import PaymentsSummary from "@/features/future-balance/components/PaymentsSummary";
import Modal from "@/shared/components/Modal";
import DashboardRecurringPaymentsGrid from "@/features/recurring-payments/components/DashboardRecurringPaymentsGrid";
//Animations
import { AnimatePresence, motion } from "motion/react";
//Api
import { useFutureBalance } from "../hooks/useFutureBalance";
import { useRecurringPayments } from "@/features/recurring-payments/hooks/useRecurringPayments";

interface FutureBalanceProps {
  totalBalance: number;
}

type PaymentType = "income" | "expense";
type ModeType = "endOfMonth" | "specificDate";

const FutureBalance: React.FC<FutureBalanceProps> = ({ totalBalance }) => {
  const [mode, setMode] = useState<ModeType>("endOfMonth");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [detailsType, setDetailsType] = useState<PaymentType | null>(null);

  const { data = [] } = useRecurringPayments();

  const {
    incomePayments,
    expensePayments,
    incomeTotal,
    expenseTotal,
    futureBalance,
  } = useFutureBalance(totalBalance, mode, selectedDate, data);

  const handleToggleDetails = (type: "income" | "expense" | null) => {
    if (detailsType === type) {
      setDetailsType(null);
    } else {
      setDetailsType(type);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-5 p-5 min-w-90 rounded-lg shadow-default"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <SelectMode
        mode={mode}
        selectMode={setMode}
        dateSelected={selectedDate}
        onDateSelect={setSelectedDate}
      />

      <PaymentsSummary
        incomePayments={incomePayments}
        expensePayments={expensePayments}
        incomeTotal={incomeTotal}
        expenseTotal={expenseTotal}
        activeType={detailsType}
        openDetails={handleToggleDetails}
      />

      <AnimatePresence>
        {detailsType && (
          <Modal onClose={() => handleToggleDetails(null)}>
            <DashboardRecurringPaymentsGrid
              type={detailsType}
              toggleDetails={handleToggleDetails}
              payments={
                detailsType === "income" ? incomePayments : expensePayments
              }
            />
            <Link href="/recurring-payments">All payments</Link>
          </Modal>
        )}
      </AnimatePresence>
      <div className="flex justify-between items-center w-full">
        <h4 className="text-secondary">
          Balance{" "}
          {mode === "endOfMonth"
            ? "at end of month"
            : `on ${selectedDate?.format("DD MMM YYYY")}`}
        </h4>
        <h2>£{futureBalance.toFixed(2)}</h2>
      </div>
    </motion.div>
  );
};

export default FutureBalance;
