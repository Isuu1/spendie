"use client";

import React from "react";

//Styles
import styles from "./RecurringPaymentsGrid.module.scss";
//Icons
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { BiSolidMessageSquareAdd } from "react-icons/bi";

//Types
import { RecurringPayment } from "@/shared/types/recurring-payment";
import Button from "@/shared/components/ui/Button";
import Link from "next/link";
import { deleteRecurringPayment } from "../lib/actions/delete-recurring-payment";
import toast from "react-hot-toast";

interface RecurringPaymentsGridProps {
  recurringPayments: RecurringPayment[];
}

const RecurringPaymentsGrid: React.FC<RecurringPaymentsGridProps> = ({
  recurringPayments,
}) => {
  const handleDeletePayment = async (paymentId: string) => {
    const result = await deleteRecurringPayment(paymentId);
    if (result.success) {
      toast.success("Recurring payment deleted successfully!");
    }
    if (result.error) {
      toast.error(`Failed to delete recurring payment: ${result.error}`);
    }
  };

  return (
    <div className={styles.gridContainer}>
      <div className={styles.newPaymentButton}>
        <Link href="/recurring-payments/add-payment">
          <Button
            variant="primary"
            size="medium"
            type="button"
            text="New"
            icon={<BiSolidMessageSquareAdd />}
            iconPosition="left"
          />
        </Link>
      </div>

      {/* <ul className={styles.gridHeader}>
        <li className={styles.item}></li>
        <li className={styles.item}>Date</li>
        <li className={styles.item}>Repeat</li>
        <li className={styles.item}>Amount</li>
      </ul> */}
      {!recurringPayments ||
        (recurringPayments.length === 0 && (
          <p className={styles.noPayments}>No recurring payments found.</p>
        ))}
      {recurringPayments &&
        recurringPayments.map((payment: RecurringPayment) => (
          <div key={payment.id} className={styles.gridItem}>
            <div className={styles.menu}>
              <Button
                variant="secondary"
                size="small"
                type="button"
                text="Edit"
                icon={<BiSolidMessageSquareAdd />}
                iconPosition="left"
              />
              <Button
                variant="secondary"
                size="small"
                type="button"
                text="Delete"
                icon={<IoTrashBin />}
                iconPosition="left"
                onClick={() => handleDeletePayment(payment.id)}
              />
            </div>
            <div className={styles.data}>
              <div className={styles.details}>
                <p>{payment.name}</p>
                <p className={styles.date}>{payment.date}</p>
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
