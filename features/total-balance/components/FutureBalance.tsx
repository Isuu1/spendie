"use client";

import React, { useMemo, useState } from "react";
import moment, { Moment } from "moment";
//Styles
import styles from "./FutureBalance.module.scss";
//Types
import { RecurringPayment } from "@/shared/types/recurring-payment";
//Utils
import { populatePaymentsTillDate } from "@/features/recurring-payments/lib/utils/populatePaymentsTillDate";
//Components
import SelectMode from "@/features/total-balance/components/SelectMode";
import PaymentsSummary from "./PaymentsSummary";
import PaymentsDetailsModal from "./PaymentsDetailsModal";

interface FutureBalanceProps {
  recurringPayments: RecurringPayment[];
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
  recurringPayments,
}) => {
  //States
  const [mode, setMode] = useState<Mode>("endOfMonth");
  const [dateSelected, setDateSelected] = useState<Moment | null>(null);
  const [showUpcomingChangeDetails, setShowUpcomingChangeDetails] = useState<
    "income" | "expense" | null
  >(null);

  //Payments filtering
  const specificDate =
    mode === "endOfMonth" ? moment().endOf("month") : dateSelected;

  const paymentsTillDate = useMemo(
    () =>
      populatePaymentsTillDate(
        specificDate || moment().endOf("month"),
        recurringPayments
      ),
    [specificDate, recurringPayments]
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
      {showUpcomingChangeDetails && (
        <PaymentsDetailsModal
          type={showUpcomingChangeDetails}
          toggleDetails={handleToggleDetails}
          paymentsTillDate={paymentsTillDate}
        />
      )}
      <div className={styles.balance}>
        <h3>Balance after payments</h3>
        <h2 className={styles.value}>£{futureBalance.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default FutureBalance;
