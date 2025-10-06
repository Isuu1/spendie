import React, { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
//Styles
import styles from "./PaymentsDetailsModal.module.scss";
//Components
import Modal from "@/shared/components/Modal";
//Icons
import { FaRepeat } from "react-icons/fa6";
//Animations
import { motion } from "motion/react";
//Types
import { RecurringPayment } from "@/features/recurring-payments/types/recurring-payment";
import Pagination from "@/shared/components/Pagination";
import Button from "@/shared/components/ui/Button";
import { markAsPaid } from "@/features/recurring-payments/lib/actions/markAsPaid";
import toast from "react-hot-toast";
import { toastStyle } from "@/shared/styles/toastStyle";

interface PaymentsDetailsModalProps {
  type: "income" | "expense";
  toggleDetails?: (type: "income" | "expense" | null) => void;
  paymentsTillDate?: RecurringPayment[];
}

const activeIndicatorVariants = {
  income: { x: 0 },
  expense: { x: "100%" },
};

const PaymentsDetailsModal: React.FC<PaymentsDetailsModalProps> = ({
  type,
  toggleDetails,
  paymentsTillDate,
}) => {
  const ITEMS_PER_PAGE = 3;

  const [page, setPage] = useState(1);

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filteredPayments =
    paymentsTillDate
      ?.filter((p) => p.type.toLowerCase() === type)
      .sort(
        (a, b) =>
          new Date(a.next_payment_date).getTime() -
          new Date(b.next_payment_date).getTime()
      ) || [];

  const totalPages = Math.ceil(
    (filteredPayments?.length ?? 1) / ITEMS_PER_PAGE
  );

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredPayments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleMarkAsPaid = async (payment: RecurringPayment) => {
    setLoadingId(payment.id);
    try {
      const result = await markAsPaid(payment);
      console.log("Payment marked as paid:", result);
      if (result?.error) {
        console.error("Error marking payment as paid:", result.error);
        toast.error(result.error, toastStyle);
      }
      setTimeout(() => setLoadingId(null), 500);
    } catch (error) {
      console.error("Error marking payment as paid:", error);
    }
  };

  const paymentStatus = (payment: RecurringPayment) => {
    const today = moment();
    const paymentDate = moment(payment.next_payment_date);
    const daysDiff = paymentDate.diff(today, "days");

    if (daysDiff < 0) {
      return "This payment is late";
    } else if (daysDiff === 0) {
      return "Coming in 3 days";
    } else {
      return null;
    }
  };

  useEffect(() => setPage(1), [type]);

  return (
    <Modal onClose={() => toggleDetails?.(null)}>
      <h3>{type === "income" ? "Income payments" : "Expense payments"}</h3>
      <ul className={styles.nav}>
        <motion.span
          className={styles.active}
          variants={activeIndicatorVariants}
          animate={type}
          initial={false} // Prevent animation on initial render
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
        ></motion.span>
        <li className={styles.item} onClick={() => toggleDetails?.("income")}>
          Income
        </li>
        <li className={styles.item} onClick={() => toggleDetails?.("expense")}>
          Expense
        </li>
      </ul>
      <ul className={styles.labelsBar}>
        <li>Name</li>
        <li>Date</li>
        <li>Amount</li>
      </ul>
      <div className={`${styles.paymentsList} `}>
        {currentItems?.map((payment, idx) => (
          <div className={styles.paymentItemWrapper} key={idx}>
            <div className={`${styles.paymentItem} ${styles[type]}`}>
              <div className={styles.details}>
                <span className={styles.name}>{payment.name ?? "Income"}</span>
                <span className={styles.repeat}>
                  <FaRepeat /> {payment.repeat}
                </span>
              </div>
              <span className={styles.date}>
                {moment(payment.next_payment_date).format("DD MMM `YY")}
              </span>
              <span className={styles.amount}>
                {type === "income" ? "+£" : "-£"}
                {payment.amount?.toFixed(2) ?? "0.00"}
                <Button
                  text={
                    loadingId === payment.id ? "Processing..." : "Mark as paid"
                  }
                  variant="primary"
                  size="medium"
                  onClick={() => handleMarkAsPaid(payment)}
                  disabled={loadingId === payment.id}
                />
              </span>
            </div>
            {paymentStatus(payment) && (
              <span className={styles.status}>{paymentStatus(payment)}</span>
            )}
          </div>
        ))}
        {totalPages > 1 && (
          <Pagination
            page={page}
            onPageChange={setPage}
            totalPages={totalPages}
          />
        )}
      </div>
      {filteredPayments.length === 0 && <p>No upcoming payments</p>}
      <Link href="/recurring-payments" className={styles.paymentsLink}>
        All payments
      </Link>
    </Modal>
  );
};

export default PaymentsDetailsModal;
