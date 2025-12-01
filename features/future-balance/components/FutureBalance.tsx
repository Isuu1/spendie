"use client";

import React, { useMemo, useState } from "react";
import moment, { Moment } from "moment";
import Link from "next/link";
//Styles
import styles from "./FutureBalance.module.scss";
//Utils
import { populateRecurringPayments } from "@/features/recurring-payments/lib/utils/populateRecurringPayments";
import { calculateTotals } from "../utils/calculateTotals";
//Components
import SelectMode from "@/features/future-balance/components/SelectMode";
import PaymentsSummary from "@/features/future-balance/components/PaymentsSummary";
import Modal from "@/shared/components/Modal";
import PopulatedRecurringPaymentsList from "@/features/recurring-payments/components/PopulatedRecurringPaymentsList";
//Animations
import { AnimatePresence, motion } from "motion/react";
//Api
import { useRecurringPaymentsClient } from "@/features/recurring-payments/hooks/useRecurringPaymentsClient";
import { useRecurringPaymentsHistoryClient } from "@/features/recurring-payments/hooks/useRecurringPaymentsHistoryClient";

interface FutureBalanceProps {
  totalBalance: number;
}

type PaymentType = "income" | "expense";
type ModeType = "endOfMonth" | "specificDate";

const FutureBalance: React.FC<FutureBalanceProps> = ({ totalBalance }) => {
  const [mode, setMode] = useState<ModeType>("endOfMonth");
  const [dateSelected, setDateSelected] = useState<Moment | null>(null);
  const [showPaymentsDetails, setShowPaymentsDetails] =
    useState<PaymentType | null>(null);

  const { data: recurringPayments } = useRecurringPaymentsClient();
  const { data: paymentsHistory } = useRecurringPaymentsHistoryClient();

  const targetDate = useMemo(() => {
    return mode === "endOfMonth"
      ? moment().endOf("month")
      : dateSelected || moment();
  }, [mode, dateSelected]);

  const paymentsTillDate = useMemo(
    () =>
      populateRecurringPayments(
        targetDate,
        recurringPayments || [],
        paymentsHistory || []
      ),
    [targetDate, recurringPayments, paymentsHistory]
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
    if (showPaymentsDetails === type) {
      setShowPaymentsDetails(null);
    } else {
      setShowPaymentsDetails(type);
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
        dateSelected={dateSelected}
        onDateSelect={setDateSelected}
      />

      <PaymentsSummary
        paymentsTillDate={paymentsTillDate}
        type={showPaymentsDetails}
        toggleDetails={handleToggleDetails}
      />

      <AnimatePresence>
        {showPaymentsDetails && (
          <Modal onClose={() => handleToggleDetails(null)}>
            <PopulatedRecurringPaymentsList
              type={showPaymentsDetails}
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
