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
import { useRecurringPaymentsClient } from "../hooks/useRecurringPaymentsClient";

const RecurringPaymentsGrid: React.FC = () => {
  const { data: recurringPayments = [], error: recurringPaymentsError } =
    useRecurringPaymentsClient();

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

      {recurringPaymentsError && (
        <ErrorMessage
          variant="panel"
          message="Failed to load recurring payments."
        />
      )}

      <div className={styles.paymentsGrid}>
        {recurringPayments.map((payment) => {
          return <RecurringPaymentItem key={payment.id} payment={payment} />;
        })}
      </div>

      {!hasPayments && !recurringPaymentsError && (
        <p className={styles.noPayments}>No recurring payments found.</p>
      )}
    </div>
  );
};

export default RecurringPaymentsGrid;
