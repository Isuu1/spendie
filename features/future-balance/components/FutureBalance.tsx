"use client";

import React, { useMemo, useState } from "react";
import moment, { Moment } from "moment";
import Link from "next/link";
//Styles
import styles from "./FutureBalance.module.scss";
//Utils
import { populateRecurringPayments } from "@/features/recurring-payments/lib/utils/populateRecurringPayments";
//Components
import SelectMode from "@/features/future-balance/components/SelectMode";
import PaymentsSummary from "@/features/future-balance/components/PaymentsSummary";
import Modal from "@/shared/components/Modal";
import PopulatedRecurringPaymentsList from "@/features/recurring-payments/components/PopulatedRecurringPaymentsList";
//Animations
import { AnimatePresence, motion } from "motion/react";
import { useRecurringPaymentsClient } from "@/features/recurring-payments/hooks/useRecurringPaymentsClient";
import { useRecurringPaymentsHistoryClient } from "@/features/recurring-payments/hooks/useRecurringPaymentsHistoryClient";
import { calculateTotals } from "../utils/calculateTotals";

interface FutureBalanceProps {
  totalBalance: number;
  active: boolean;
}

const FutureBalance: React.FC<FutureBalanceProps> = ({ totalBalance }) => {
  const [mode, setMode] = useState<"endOfMonth" | "specificDate">("endOfMonth");
  const [dateSelected, setDateSelected] = useState<Moment | null>(null);
  const [showUpcomingChangeDetails, setShowUpcomingChangeDetails] = useState<
    "income" | "expense" | null
  >(null);

  const { data: recurringPayments } = useRecurringPaymentsClient();
  const { data: paymentsHistory } = useRecurringPaymentsHistoryClient();

  const specificDate =
    mode === "endOfMonth" ? moment().endOf("month") : dateSelected;

  const paymentsTillDate = useMemo(
    () =>
      populateRecurringPayments(
        specificDate || moment().endOf("month"),
        recurringPayments || [],
        paymentsHistory || []
      ),
    [specificDate, recurringPayments, paymentsHistory]
  );

  //Calculate income and expense from populated payments
  const { income, expense } = useMemo(
    () => calculateTotals(paymentsTillDate),
    [paymentsTillDate]
  );

  const futureBalance = useMemo(
    () => totalBalance + income - expense,
    [totalBalance, income, expense]
  );

  const handleToggleDetails = (type: "income" | "expense" | null) => {
    if (showUpcomingChangeDetails === type) {
      setShowUpcomingChangeDetails(null);
    } else {
      setShowUpcomingChangeDetails(type);
    }
  };

  return (
    <motion.div
      className={styles.futureBalance}
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      exit={{ height: 0 }}
      transition={{ duration: 2 }}
      layout
    >
      <SelectMode
        mode={mode}
        selectMode={setMode}
        dateSelected={dateSelected}
        onDateSelect={setDateSelected}
      />

      <PaymentsSummary
        paymentsTillDate={paymentsTillDate}
        type={showUpcomingChangeDetails}
        toggleDetails={handleToggleDetails}
      />

      <AnimatePresence>
        {showUpcomingChangeDetails && (
          <Modal onClose={() => handleToggleDetails(null)}>
            <PopulatedRecurringPaymentsList
              type={showUpcomingChangeDetails}
              toggleDetails={handleToggleDetails}
              paymentsTillDate={paymentsTillDate}
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
