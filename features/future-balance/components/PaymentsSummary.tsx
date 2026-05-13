import React from "react";
import clsx from "clsx";
//Styles
import styles from "./PaymentsSummary.module.scss";
//Icons
import { TbArrowBigDownFilled } from "react-icons/tb";
import { TbArrowBigUpFilled } from "react-icons/tb";
import { useFutureBalanceContext } from "../context/FutureBalanceContext";
import { AnimatePresence } from "motion/react";
import Modal from "@/shared/components/Modal";
import DashboardRecurringPaymentsGrid from "@/features/recurring-payments/components/DashboardRecurringPaymentsGrid";

const PaymentsSummary = () => {
  const {
    incomePayments,
    expensePayments,
    incomeTotal,
    expenseTotal,
    detailsType,
    setDetailsType,
  } = useFutureBalanceContext();

  if (incomePayments.length === 0 && expensePayments.length === 0) {
    return (
      <div className={styles.upcomingPaymentsContainer}>
        <p className={styles.none}>No upcoming changes</p>
      </div>
    );
  }

  const handleToggleDetails = (type: "income" | "expense" | null) => {
    if (detailsType === type) {
      setDetailsType(null);
    } else {
      setDetailsType(type);
    }
  };

  return (
    <>
      <AnimatePresence>
        {detailsType && (
          <Modal onClose={() => handleToggleDetails(null)}>
            <DashboardRecurringPaymentsGrid
              type={detailsType}
              toggleDetails={handleToggleDetails}
              payments={
                detailsType === "income" ? incomePayments : expensePayments
              }
            />
          </Modal>
        )}
      </AnimatePresence>
      <div className={styles.upcomingPaymentsContainer}>
        {incomePayments.length > 0 && (
          <div
            className={clsx([
              styles.item,
              styles.income,
              detailsType === "income" ? styles.active : "",
            ])}
            onClick={() => handleToggleDetails("income")}
          >
            <div
              className={`${styles.iconWrapper} ${styles.incomeIconWrapper}`}
            >
              <i className={styles.icon}>
                <TbArrowBigUpFilled />
              </i>
            </div>
            <div className={styles.details}>
              <span>
                {incomePayments.length}
                {` `}
                Income
              </span>
              <span className={`${styles.amount} ${styles.income}`}>
                +£{incomeTotal.toFixed(2)}
              </span>
            </div>
          </div>
        )}
        {expensePayments.length > 0 && (
          <div
            className={clsx([
              styles.item,
              styles.expense,
              detailsType === "expense" ? styles.active : "",
            ])}
            onClick={() => handleToggleDetails("expense")}
          >
            <div
              className={`${styles.iconWrapper} ${styles.expenseIconWrapper}`}
            >
              <i className={styles.icon}>
                <TbArrowBigDownFilled />
              </i>
            </div>
            <div className={styles.details}>
              <span>
                {expensePayments.length}
                {` `}
                Expense
              </span>
              <span className={`${styles.amount} ${styles.expense}`}>
                -£{expenseTotal.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentsSummary;
