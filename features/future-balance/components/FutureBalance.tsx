"use client";

import React, { useState } from "react";
import { Dayjs } from "dayjs";
import Link from "next/link";
//Styles
import styles from "./FutureBalance.module.scss";
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
      className={styles.futureBalance}
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
      <div className={styles.balance}>
        <h3>Balance after payments</h3>
        <h2 className={styles.value}>£{futureBalance.toFixed(2)}</h2>
      </div>
    </motion.div>
  );
};

export default FutureBalance;
