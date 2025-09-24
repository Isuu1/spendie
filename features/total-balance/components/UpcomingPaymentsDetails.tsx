import { RecurringPayment } from "@/shared/types/recurring-payment";
import React, { useState } from "react";
//Styles
import styles from "./UpcomingPaymentsDetails.module.scss";
import moment from "moment";
import Modal from "@/shared/components/Modal";
//Icons
import { FaRepeat } from "react-icons/fa6";
//Animations
import { motion } from "motion/react";

interface UpcomingPaymentsDetailsProps {
  type: "income" | "expense";
  onTypeChange?: (type: "income" | "expense" | null) => void;
  toggleDetails?: (type: "income" | "expense" | null) => void;
  paymentsTillDate?: RecurringPayment[];
}

const activeIndicatorVariants = {
  income: { x: 0 },
  expense: { x: "100%" },
};

const UpcomingPaymentsDetails: React.FC<UpcomingPaymentsDetailsProps> = ({
  type,
  onTypeChange,
  toggleDetails,
  paymentsTillDate,
}) => {
  const ITEMS_PER_PAGE = 3;

  const [page, setPage] = useState(1);

  const filteredPayments =
    paymentsTillDate
      ?.filter((p) => p.type.toLowerCase() === type)
      .sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      ) || [];

  const totalPages = Math.ceil(
    (filteredPayments?.length ?? 1) / ITEMS_PER_PAGE
  );

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredPayments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <Modal onClose={() => toggleDetails?.(null)}>
      <h3>{type === "income" ? "Income payments" : "Expense payments"}</h3>
      <ul className={styles.nav}>
        <motion.span
          className={styles.active}
          variants={activeIndicatorVariants}
          animate={type}
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
        ></motion.span>
        <li className={styles.item} onClick={() => onTypeChange?.("income")}>
          Income
        </li>
        <li className={styles.item} onClick={() => onTypeChange?.("expense")}>
          Expense
        </li>
      </ul>
      <ul className={styles.menu}>
        <li>Name</li>
        <li>Date</li>
        <li>Amount</li>
      </ul>
      <div className={`${styles.paymentsList} `}>
        {currentItems?.map((payment, idx) => (
          <div key={idx} className={`${styles.paymentItem} ${styles[type]}`}>
            <div className={styles.details}>
              <span className={styles.name}>{payment.name ?? "Income"}</span>
              <span className={styles.repeat}>
                <FaRepeat /> {payment.repeat}
              </span>
            </div>
            <span className={styles.date}>
              {moment(payment.date).format("DD MMM `YY")}
            </span>
            <span className={styles.amount}>
              {type === "income" ? "+£" : "-£"}
              {payment.amount?.toFixed(2) ?? "0.00"}
            </span>
          </div>
        ))}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageButton}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <div className={styles.pageNumbers}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    className={`${styles.pageButton} ${page === pageNum ? styles.active : ""}`}
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                )
              )}
            </div>
            <button
              className={styles.pageButton}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
      {paymentsTillDate?.filter((p) => p.type.toLowerCase() === type).length ===
        0 && <p>No upcoming payments</p>}
      <p className={styles.paymentsLink}>All payments</p>
    </Modal>
  );
};

export default UpcomingPaymentsDetails;
