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
//Utils
import { sortRecurringPayments } from "../lib/utils/sortRecurringPayments";

const sortingOptions = ["Date", "Amount", "Name"] as const;

type SortOption = (typeof sortingOptions)[number];

const RecurringPaymentsGrid: React.FC = () => {
  const { data = [], error } = useRecurringPayments();

  const [sortOption, setSortOption] = React.useState<SortOption>("Date");

  const handleSortingChange = (value: SortOption) => {
    setSortOption(value);
  };

  const sortedPayments = React.useMemo(() => {
    return sortRecurringPayments(data, sortOption);
  }, [data, sortOption]);

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
            selectOptions={sortingOptions}
            value={sortOption}
            onChange={(value) => handleSortingChange(value as SortOption)}
          />
        </div>
      </div>

      <div className={styles.paymentsGrid}>
        {sortedPayments.map((payment) => {
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
