"use client";

import React, { useMemo, useState } from "react";
import moment, { Moment } from "moment";
import Link from "next/link";
//Styles
import styles from "./FutureBalance.module.scss";
//Types
import {
  RecurringPayment,
  //RecurringPaymentHistory,
} from "@/features/recurring-payments/types/recurring-payment";
//Utils
import { populateRecurringPayments } from "@/features/recurring-payments/lib/utils/populateRecurringPayments";
//Components
import SelectMode from "@/features/total-balance/components/SelectMode";
import PaymentsSummary from "./PaymentsSummary";
import Modal from "@/shared/components/Modal";
import PopulatedRecurringPaymentsList from "@/features/recurring-payments/components/PopulatedRecurringPaymentsList";
//Animations
import { AnimatePresence } from "motion/react";
import { useRecurringPaymentsClient } from "@/features/recurring-payments/hooks/useRecurringPaymentsClient";
import { useRecurringPaymentsHistoryClient } from "@/features/recurring-payments/hooks/useRecurringPaymentsHistoryClient";

interface FutureBalanceProps {
  //recurringPaymentsError: string | null;
  totalBalance: number;
}

const calculateTotals = (payments: RecurringPayment[]) => {
  const income = payments
    .filter((p) => p.type.toLowerCase() === "income")
    .reduce((sum, p) => sum + p.amount, 0);

  const expense = payments
    .filter((p) => p.type.toLowerCase() === "expense")
    .reduce((sum, p) => sum + p.amount, 0);

  return { income, expense };
};

type Mode = "endOfMonth" | "specificDate";

const FutureBalance: React.FC<FutureBalanceProps> = ({
  totalBalance,
  //recurringPaymentsError,
}) => {
  //States
  const [mode, setMode] = useState<Mode>("endOfMonth");
  const [dateSelected, setDateSelected] = useState<Moment | null>(null);
  const [showUpcomingChangeDetails, setShowUpcomingChangeDetails] = useState<
    "income" | "expense" | null
  >(null);

  const {
    data: recurringPayments,
    // isLoading,
    // error,
  } = useRecurringPaymentsClient();
  const {
    data: paymentsHistory,
    //isLoading,
    //error,
  } = useRecurringPaymentsHistoryClient();
  console.log("Recurring Payments Data:", recurringPayments);

  //Payments filtering
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
    <div className={styles.futureBalance}>
      <SelectMode
        mode={mode}
        dateSelected={dateSelected}
        onDateSelect={setDateSelected}
        onRangeSelect={setMode}
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
    </div>
  );
};

export default FutureBalance;
