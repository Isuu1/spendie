"use client";

import React from "react";
import { useEffect, useState } from "react";
//Styles
import styles from "./DashboardRecurringPaymentsGrid.module.scss";
//Animations
import { motion } from "motion/react";
//Types
import { RecurringPayment } from "@/features/recurring-payments/types/recurring-payment";
//Components
import Pagination from "@/shared/components/Pagination";
import PopulatedRecurringPaymentItem from "./PopulatedRecurringPaymentItem";

interface DashboardRecurringPaymentsGridProps {
  type: "income" | "expense";
  toggleDetails: (type: "income" | "expense" | null) => void;
  payments: RecurringPayment[];
}

const activeIndicatorVariants = {
  income: { x: 0 },
  expense: { x: "100%" },
};

const DashboardRecurringPaymentsGrid: React.FC<
  DashboardRecurringPaymentsGridProps
> = ({ type, toggleDetails, payments }) => {
  //Pagination state and logic

  const ITEMS_PER_PAGE = 3;

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil((payments?.length ?? 1) / ITEMS_PER_PAGE);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = payments.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => setPage(1), [type]);

  return (
    <>
      <h3>Upcoming payments</h3>

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
        {currentItems?.map((payment) => (
          <PopulatedRecurringPaymentItem
            key={`${payment.id}-${payment.next_payment_date}`}
            payment={payment}
          />
        ))}
        {totalPages > 1 && (
          <Pagination
            page={page}
            onPageChange={setPage}
            totalPages={totalPages}
          />
        )}
      </div>

      {payments.length === 0 && <p>No upcoming payments</p>}
    </>
  );
};

export default DashboardRecurringPaymentsGrid;
