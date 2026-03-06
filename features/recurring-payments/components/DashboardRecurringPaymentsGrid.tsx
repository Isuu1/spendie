"use client";

import React, { useMemo } from "react";
import { useState } from "react";
import clsx from "clsx";
//Styles
import styles from "./DashboardRecurringPaymentsGrid.module.scss";
//Animations
import { motion } from "motion/react";
//Types
import { RecurringPayment } from "@/features/recurring-payments/types/recurring-payment";
//Icons
import { TbArrowBigDownLineFilled } from "react-icons/tb";
//Components
import Pagination from "@/shared/components/Pagination";
import DashboardRecurringPaymentItem from "./DashboardRecurringPaymentItem";
//Utils
import { sortDashboardRecurringPayments } from "../lib/utils/sortDashboardRecurringPayments";
import { useRecurringPaymentsPagination } from "../hooks/useRecurringPaymentsPagination";

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
  const [sortingOption, setSortingOption] = useState<"name" | "date">("date");

  const sortedPayments = useMemo(() => {
    return sortDashboardRecurringPayments(payments, sortingOption);
  }, [payments, sortingOption]);

  const { page, setPage, totalPages, currentItems } =
    useRecurringPaymentsPagination(sortedPayments, 4);

  const handleSortingChange = (option: "name" | "date") => {
    setSortingOption(option);
    setPage(1); //Reset to first page on sorting change
  };

  if (payments.length === 0) return <p>No upcoming payments</p>;

  return (
    <>
      <h3>Upcoming payments</h3>

      <ul className={styles.nav}>
        <motion.span
          className={styles.active}
          variants={activeIndicatorVariants}
          animate={type}
          initial={false} //Prevent animation on initial render
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
        <li
          className={clsx(
            styles.label,
            sortingOption === "name" ? styles.activeLabel : "",
          )}
          onClick={() => handleSortingChange("name")}
        >
          <span>Name</span>
          <TbArrowBigDownLineFilled />
        </li>
        <li
          className={clsx(
            styles.label,
            sortingOption === "date" ? styles.activeLabel : "",
          )}
          onClick={() => handleSortingChange("date")}
        >
          <span>Date</span>
          <TbArrowBigDownLineFilled />
        </li>
        <li className={styles.label}>Actions</li>
      </ul>

      <div className={styles.paymentsList}>
        {currentItems?.map((payment) => (
          <DashboardRecurringPaymentItem
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
    </>
  );
};

export default DashboardRecurringPaymentsGrid;
