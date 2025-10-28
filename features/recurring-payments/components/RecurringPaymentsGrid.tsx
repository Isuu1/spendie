"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import moment from "moment";
//Styles
import styles from "./RecurringPaymentsGrid.module.scss";
//Icons
import { MdOutlineAddCard } from "react-icons/md";
//Types
import {
  RecurringPayment,
  RecurringPaymentHistory,
} from "@/features/recurring-payments/types/recurring-payment";
//Components
import SelectInput from "@/shared/components/ui/SelectInput";
import RecurringPaymentMenu from "./RecurringPaymentMenu";
import ErrorMessage from "@/shared/components/ErrorMessage";
import PaymentStatus from "./PaymentStatus";
//Utils
import { populateRecurringPayments } from "../lib/utils/populateRecurringPayments";

interface RecurringPaymentsGridProps {
  recurringPayments: RecurringPayment[];
  paymentsHistory: RecurringPaymentHistory[];
  error?: string | null;
}

const RecurringPaymentsGrid: React.FC<RecurringPaymentsGridProps> = ({
  recurringPayments,
  paymentsHistory,
  error,
}) => {
  const hasPayments = recurringPayments.length > 0;

  const populatedPayments = useMemo(
    () =>
      populateRecurringPayments(
        moment().endOf("year"),
        recurringPayments,
        paymentsHistory
      ),
    [recurringPayments, paymentsHistory]
  );

  const formatedDate = (dateStr: string) => {
    return moment(dateStr).format("Do MMMM YYYY");
  };

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

        {recurringPayments.map((payment: RecurringPayment) => {
          const populatedPayment = populatedPayments.find(
            (p) => p.id === payment.id
          );

          return (
            <div key={payment.id} className={styles.gridItem}>
              <div className={styles.details}>
                <p className={styles.name}>{payment.name}</p>

                {populatedPayment && (
                  <>
                    <p className={styles.date}>
                      Next payment:{" "}
                      {formatedDate(populatedPayment.next_payment_date)}
                    </p>
                    <PaymentStatus payment={populatedPayment} />
                  </>
                )}
              </div>
              <p className={styles.frequency}>{payment.repeat}</p>
              <div
                className={`${styles.type} ${payment.type === "Income" ? styles.income : styles.expense}`}
              >
                <p>£{payment.amount}</p>
              </div>
              <RecurringPaymentMenu payment={payment} />
            </div>
          );
        })}
      </div>

      {error && <ErrorMessage message="Failed to load recurring payments." />}

      {!hasPayments && !error && (
        <p className={styles.noPayments}>No recurring payments found.</p>
      )}
    </div>
  );
};

export default RecurringPaymentsGrid;
