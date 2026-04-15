"use client";

import React from "react";
import Link from "next/link";
//Styles
import styles from "./RecurringPaymentsGrid.module.scss";
//Icons
import { MdOutlineAddCard } from "react-icons/md";
//Components
import SelectInput from "@/shared/components/ui/SelectInput";
import ErrorMessage from "@/shared/components/ErrorMessage";
import RecurringPaymentItem from "./RecurringPaymentItem";
//Hooks
import { useRecurringPayments } from "../hooks/useRecurringPayments";
import { useSorting } from "@/shared/hooks/useSorting";
//Config
import { sortingOptions } from "../config/sortingOptions";

//Extraact only label and value for SelectInput
const selectOptions = sortingOptions.map(({ label, value }) => ({
  label,
  value,
}));

const RecurringPaymentsGrid: React.FC = () => {
  const { data = [], error } = useRecurringPayments();

  const { sortedItems, sortOption, handleSortingChange } = useSorting(
    data,
    sortingOptions,
    "Date",
  );

  const hasPayments = data.length > 0;

  if (error)
    return (
      <ErrorMessage
        variant="panel"
        message="Failed to load recurring payments."
      />
    );

  return (
    <div className={styles.gridContainer}>
      <div className={styles.optionsBar}>
        <Link
          className={styles.addPayment}
          href="/recurring-payments/add-payment"
        >
          <i className={styles.icon}>
            <MdOutlineAddCard />
          </i>
          Add payment
        </Link>
        <div className={styles.sorting}>
          <span>Sort by</span>
          <SelectInput
            id="sort"
            selectOptions={selectOptions}
            value={{ label: sortOption.label, value: sortOption.value }}
            onChange={(option) => handleSortingChange(option.value)}
          />
        </div>
      </div>

      <div className={styles.paymentsGrid}>
        {sortedItems.map((payment) => {
          return <RecurringPaymentItem key={payment.id} payment={payment} />;
        })}
      </div>

      {!hasPayments && !error && (
        <p className={styles.noPayments}>No recurring payments found.</p>
      )}
    </div>
  );
};

export default RecurringPaymentsGrid;
