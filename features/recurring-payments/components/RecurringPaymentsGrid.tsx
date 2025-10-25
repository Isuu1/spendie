"use client";

import React from "react";
import Link from "next/link";

//Styles
import styles from "./RecurringPaymentsGrid.module.scss";
//Icons
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { FaCalendarPlus } from "react-icons/fa";
//Types
import { RecurringPayment } from "@/features/recurring-payments/types/recurring-payment";
//Components
import Button from "@/shared/components/ui/Button";
import SelectInput from "@/shared/components/ui/SelectInput";
import RecurringPaymentMenu from "./RecurringPaymentMenu";

interface RecurringPaymentsGridProps {
  recurringPayments: RecurringPayment[];
}

const RecurringPaymentsGrid: React.FC<RecurringPaymentsGridProps> = ({
  recurringPayments,
}) => {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.optionsBar}>
        <Link href="/recurring-payments/add-payment">
          <Button
            variant="primary"
            size="medium"
            type="button"
            text="Add payment"
            icon={<FaCalendarPlus />}
            iconPosition="left"
          />
        </Link>
        <div className={styles.sorting}>
          <span>Sort by</span>
          <SelectInput id="sort" selectOptions={["Date", "Amount", "Name"]} />
        </div>
      </div>

      {!recurringPayments ||
        (recurringPayments.length === 0 && (
          <p className={styles.noPayments}>No recurring payments found.</p>
        ))}

      {recurringPayments.map((payment: RecurringPayment) => (
        <div key={payment.id} className={styles.gridItem}>
          <RecurringPaymentMenu payment={payment} />

          <div className={styles.data}>
            <div className={styles.details}>
              <p>{payment.name}</p>
              <p className={styles.date}>{payment.first_payment_date}</p>
            </div>
            <p className={styles.frequency}>{payment.repeat}</p>
            {payment.type === "Income" ? (
              <div className={`${styles.type} ${styles.income}`}>
                <FaLongArrowAltUp />
                <span>£{payment.amount}</span>
              </div>
            ) : (
              <div className={`${styles.type} ${styles.expense}`}>
                <FaLongArrowAltDown />
                <span>£{payment.amount}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecurringPaymentsGrid;
