"use client";

import React from "react";
import Link from "next/link";
//Styles
import styles from "./RecurringPaymentsGrid.module.scss";
//Icons
import { MdOutlineAddCard } from "react-icons/md";
//Types
import { RecurringPayment } from "@/features/recurring-payments/types/recurring-payment";
//Components
import SelectInput from "@/shared/components/ui/SelectInput";
import RecurringPaymentMenu from "./RecurringPaymentMenu";
import ErrorMessage from "@/shared/components/ErrorMessage";

interface RecurringPaymentsGridProps {
  recurringPayments: RecurringPayment[];
  error?: string | null;
}

const RecurringPaymentsGrid: React.FC<RecurringPaymentsGridProps> = ({
  recurringPayments,
  error,
}) => {
  const hasPayments = recurringPayments.length > 0;

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
          <SelectInput id="sort" selectOptions={["Date", "Amount", "Name"]} />
        </div>
      </div>

      <div className={styles.paymentsGrid}>
        <ul className={styles.gridHeader}>
          <li>Details</li>
          <li>Frequency</li>
          <li>Amount</li>
          <li>Actions</li>
        </ul>

        {recurringPayments.map((payment: RecurringPayment) => (
          <div key={payment.id} className={styles.gridItem}>
            <div className={styles.details}>
              <p>{payment.name}</p>
              <p className={styles.date}>{payment.first_payment_date}</p>
            </div>
            <p className={styles.frequency}>{payment.repeat}</p>
            <div
              className={`${styles.type} ${payment.type === "Income" ? styles.income : styles.expense}`}
            >
              <span>£{payment.amount}</span>
            </div>
            <RecurringPaymentMenu payment={payment} />
          </div>
        ))}
      </div>

      {error && <ErrorMessage message="Failed to load recurring payments." />}

      {!hasPayments && !error && (
        <p className={styles.noPayments}>No recurring payments found.</p>
      )}
    </div>
  );
};

export default RecurringPaymentsGrid;
