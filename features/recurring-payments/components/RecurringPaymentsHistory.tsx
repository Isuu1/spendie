import React from "react";
//Styles
import styles from "./RecurringPaymentsHistory.module.scss";
import { useRecurringPaymentsHistory } from "../hooks/useRecurringPaymentsHistory";
import { RecurringPayment } from "../types/recurring-payment";
import moment from "moment";

interface RecurringPaymentsHistoryProps {
  payment: RecurringPayment;
}

const RecurringPaymentsHistory: React.FC<RecurringPaymentsHistoryProps> = ({
  payment,
}) => {
  const {
    data: recurringPaymentsHistory = [],
    error: recurringPaymentsHistoryError,
  } = useRecurringPaymentsHistory();

  const paymentHistory = recurringPaymentsHistory.filter(
    (history) => history.payment_id === payment.id,
  );

  if (recurringPaymentsHistoryError) {
    return <div>Error loading payment history</div>;
  }

  return (
    <>
      <h3>{payment.name} payments history</h3>
      <div className={styles.historyContainer}>
        <ul className={styles.historyHeader}>
          <li>Paid date</li>
          <li>Amount</li>
          <li>Due by</li>
        </ul>
        {paymentHistory.map((history) => (
          <ul key={history.id} className={styles.historyItem}>
            <li>{moment(history.paid_date).format("DD MMM `YY")}</li>
            <li>{history.amount}</li>
            <li>{moment(history.payment_date).format("DD MMM `YY")}</li>
          </ul>
        ))}
      </div>
    </>
  );
};

export default RecurringPaymentsHistory;
