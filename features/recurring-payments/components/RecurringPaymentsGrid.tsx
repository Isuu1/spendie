"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import moment from "moment";
//Styles
import styles from "./RecurringPaymentsGrid.module.scss";
//Icons
import { MdOutlineAddCard } from "react-icons/md";
//Components
import SelectInput from "@/shared/components/ui/SelectInput";
import ErrorMessage from "@/shared/components/ErrorMessage";
import RecurringPaymentItem from "./RecurringPaymentItem";
//Utils
import { populateRecurringPayments } from "../lib/utils/populateRecurringPayments";
//Hooks
import { useRecurringPaymentsClient } from "../hooks/useRecurringPaymentsClient";
import { useRecurringPaymentsHistoryClient } from "../hooks/useRecurringPaymentsHistoryClient";

const RecurringPaymentsGrid: React.FC = () => {
  const { data: recurringPayments = [], error: recurringPaymentsError } =
    useRecurringPaymentsClient();

  const {
    data: recurringPaymentsHistory = [],
    error: recurringPaymentsHistoryError,
  } = useRecurringPaymentsHistoryClient();

  const hasPayments = recurringPayments.length > 0;

  const populatedPayments = useMemo(
    () =>
      populateRecurringPayments(
        moment().endOf("year"),
        recurringPayments,
        recurringPaymentsHistory,
      ),
    [recurringPayments, recurringPaymentsHistory],
  );

  const populatedPaymentsMap = useMemo(() => {
    return new Map(populatedPayments.map((p) => [p.id, p]));
  }, [populatedPayments]);

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
        {/* <ul className={styles.gridHeader}>
          <li>Details</li>
          <li>Frequency</li>
          <li>Amount</li>
        </ul> */}

        {recurringPayments.map((payment) => {
          const populatedPayment = populatedPaymentsMap.get(payment.id);

          if (!populatedPayment) return null; //safe guard

          return (
            <RecurringPaymentItem
              key={payment.id}
              payment={payment}
              populatedPayment={populatedPayment}
            />
          );
        })}
      </div>

      {recurringPaymentsError && (
        <ErrorMessage
          variant="panel"
          message="Failed to load recurring payments."
        />
      )}

      {recurringPaymentsHistoryError && (
        <ErrorMessage
          variant="panel"
          message="Failed to load recurring payments history."
        />
      )}

      {!hasPayments && (
        <p className={styles.noPayments}>No recurring payments found.</p>
      )}
    </div>
  );
};

export default RecurringPaymentsGrid;
