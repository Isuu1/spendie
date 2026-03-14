import React from "react";
//Styles
import styles from "./RecurringPaymentsHistory.module.scss";
import { useRecurringPaymentsHistory } from "../hooks/useRecurringPaymentsHistory";
import { RecurringPayment } from "../types/recurring-payment";
import dayjs from "dayjs";
import { useRecurringPaymentsPagination } from "../hooks/useRecurringPaymentsPagination";
import Pagination from "@/shared/components/Pagination";
import Button from "@/shared/components/ui/Button";
import PaymentHistoryStatus from "./PaymentHistoryStatus";

interface RecurringPaymentsHistoryProps {
  payment: RecurringPayment;
}

const RecurringPaymentsHistory: React.FC<RecurringPaymentsHistoryProps> = ({
  payment,
}) => {
  const [confirmClear, setConfirmClear] = React.useState(false);
  const {
    data: recurringPaymentsHistory = [],
    error: recurringPaymentsHistoryError,
  } = useRecurringPaymentsHistory();

  const paymentHistory = recurringPaymentsHistory.filter(
    (history) => history.payment_id === payment.id,
  );

  const { page, setPage, totalPages, currentItems } =
    useRecurringPaymentsPagination(paymentHistory, 4);

  if (recurringPaymentsHistoryError) {
    return <div>Error loading payment history</div>;
  }

  if (paymentHistory.length === 0) {
    return (
      <div className={styles.historyWrapper}>
        <p>
          Payments history for <strong>{payment.name}</strong>
        </p>
        <p>Looks like you don`t have any payment history yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.historyWrapper}>
      <p>
        Payments history for <strong>{payment.name}</strong>
      </p>
      <p>
        Amount: <strong>£{payment.amount}</strong>
      </p>

      <div className={styles.historyContainer}>
        <ul className={styles.historyHeader}>
          <li>Paid date</li>
          <li>Due by</li>
          <li>Status</li>
        </ul>
        {currentItems.map((history) => (
          <ul key={history.id} className={styles.historyItem}>
            <li>{dayjs(history.paid_date).format("DD MMM YYYY")}</li>
            {/* <li>£{history.amount}</li> */}
            <li>{dayjs(history.payment_date).format("DD MMM YYYY")}</li>
            <PaymentHistoryStatus paymentHistory={history} />
          </ul>
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          page={page}
          onPageChange={setPage}
          totalPages={totalPages}
        />
      )}
      <p className={styles.clear} onClick={() => setConfirmClear(true)}>
        Clear history
      </p>
      {confirmClear && (
        <div className={styles.confirmClear}>
          <p>Are you sure you want to clear the history?</p>
          <div className={styles.buttons}>
            <Button
              onClick={() => setConfirmClear(false)}
              variant="primary"
              text="Delete"
              size="small"
            />
            <Button
              onClick={() => setConfirmClear(false)}
              variant="secondary"
              text="Cancel"
              size="small"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecurringPaymentsHistory;
