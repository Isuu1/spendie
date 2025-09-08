import { RecurringPayment } from "@/shared/types/recurring-payment";
import React, { useState } from "react";
//Styles
import styles from "./UpcomingPaymentsDetails.module.scss";
import moment from "moment";
import Modal from "@/shared/components/Modal";

interface UpcomingPaymentsDetailsProps {
  type: "income" | "expense";
  toggleDetails?: (type: "income" | "expense" | null) => void;
  paymentsTillDate?: RecurringPayment[];
}

const UpcomingPaymentsDetails: React.FC<UpcomingPaymentsDetailsProps> = ({
  type,
  toggleDetails,
  paymentsTillDate,
}) => {
  const ITEMS_PER_PAGE = 3;

  const [page, setPage] = useState(1);

  const filteredPayments =
    paymentsTillDate?.filter((p) => p.type.toLowerCase() === type) || [];

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
      <h4>{type === "income" ? "Upcoming Incomes" : "Upcoming Expenses"}</h4>
      <div className={`${styles.paymentsList} `}>
        {currentItems?.map((payment, idx) => (
          <div key={idx} className={`${styles.paymentItem} ${styles[type]}`}>
            <div className={styles.details}>
              <span>{payment.name ?? "Income"}</span>
              <span>{payment.repeat}</span>
            </div>
            <div className={styles.amount}>
              <span>
                {type === "income" ? "+£" : "-£"}
                {payment.amount?.toFixed(2) ?? "0.00"}
              </span>
              <span>{moment(payment.date).format("DD MMM `YY")}</span>
            </div>
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
    </Modal>
  );
};

export default UpcomingPaymentsDetails;
