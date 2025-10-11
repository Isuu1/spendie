"use client";

import React from "react";
import { useEffect, useState } from "react";
//Styles
import styles from "./PopulatedRecurringPaymentsList.module.scss";
//Animations
import { motion } from "motion/react";
//Types
import { RecurringPayment } from "@/features/recurring-payments/types/recurring-payment";
//Components
import Pagination from "@/shared/components/Pagination";
import RecurringPaymentItem from "./RecurringPaymentItem";

interface PopulatedPaymentsDetailsModalProps {
  type: "income" | "expense";
  toggleDetails: (type: "income" | "expense" | null) => void;
  paymentsTillDate: RecurringPayment[];
}

const activeIndicatorVariants = {
  income: { x: 0 },
  expense: { x: "100%" },
};

const PopulatedRecurringPaymentsList: React.FC<
  PopulatedPaymentsDetailsModalProps
> = ({ type, toggleDetails, paymentsTillDate }) => {
  const ITEMS_PER_PAGE = 3;

  const [page, setPage] = useState(1);

  const filteredPayments =
    paymentsTillDate
      ?.filter((p) => p.type.toLowerCase() === type)
      .sort(
        (a, b) =>
          new Date(a.next_payment_date).getTime() -
          new Date(b.next_payment_date).getTime()
      ) || [];

  const totalPages = Math.ceil(
    (filteredPayments?.length ?? 1) / ITEMS_PER_PAGE
  );

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredPayments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => setPage(1), [type]);

  return (
    <>
      <h3>{type === "income" ? "Income payments" : "Expense payments"}</h3>
      <ul className={styles.nav}>
        <motion.span
          className={styles.active}
          variants={activeIndicatorVariants}
          animate={type}
          initial={false} // Prevent animation on initial render
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
        ></motion.span>
        <li className={styles.item} onClick={() => toggleDetails?.("income")}>
          Income
        </li>
        <li className={styles.item} onClick={() => toggleDetails?.("expense")}>
          Expense
        </li>
      </ul>
      <ul className={styles.labelsBar}>
        <li>Name</li>
        <li>Date</li>
        <li>Amount</li>
      </ul>
      <div className={`${styles.paymentsList} `}>
        {currentItems?.map((payment, idx) => (
          <RecurringPaymentItem key={idx} payment={payment} />
        ))}
        {totalPages > 1 && (
          <Pagination
            page={page}
            onPageChange={setPage}
            totalPages={totalPages}
          />
        )}
      </div>
      {filteredPayments.length === 0 && <p>No upcoming payments</p>}
    </>
  );
};

export default PopulatedRecurringPaymentsList;
