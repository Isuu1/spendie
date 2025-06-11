"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

//Styles
import styles from "./RecurringPaymentsGrid.module.scss";
//Icons
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
//Types
import { RecurringPayment } from "@/shared/types/recurring-payment";
//Components
import Button from "@/shared/components/ui/Button";
import ConfirmAction from "@/shared/components/ConfirmAction";
//Actions
import { deleteRecurringPayment } from "../lib/actions/delete-recurring-payment";

interface RecurringPaymentsGridProps {
  recurringPayments: RecurringPayment[];
}

const RecurringPaymentsGrid: React.FC<RecurringPaymentsGridProps> = ({
  recurringPayments,
}) => {
  const [confirmDeletePayment, setConfirmDeletePayment] = useState<
    string | null
  >(null);

  const handleDeletePayment = async (paymentId: string) => {
    const result = await deleteRecurringPayment(paymentId);
    if (result.success) {
      toast.success("Recurring payment deleted successfully!");
    }
    if (result.error) {
      toast.error(`Failed to delete recurring payment: ${result.error}`);
    }
    setConfirmDeletePayment(null);
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
                onClick={() => setConfirmDeletePayment(payment.id)}
              />
              {confirmDeletePayment && (
                <ConfirmAction
                  message="Delete payment?"
                  onCancel={() => setConfirmDeletePayment(null)}
                  onConfirm={() => handleDeletePayment(payment.id)}
                />
              )}
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
