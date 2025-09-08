import { RecurringPayment } from "@/shared/types/recurring-payment";
import React from "react";
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
  console.log("paymentsTillDate:", paymentsTillDate);
  console.log("type:", type);

  const filteredPayments = paymentsTillDate?.filter(
    (p) => p.type.toLowerCase() === type
  );

  console.log("filteredPayments:", filteredPayments);

  return (
    <Modal onClose={() => toggleDetails?.(null)}>
      <h4>{type === "income" ? "Upcoming Incomes" : "Upcoming Expenses"}</h4>
      <div className={`${styles.paymentsList} `}>
        {filteredPayments?.map((payment, idx) => (
          <div
            key={payment.id ?? idx}
            className={`${styles.paymentItem} ${styles[type]}`}
          >
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
      </div>
    </Modal>
  );
};

export default UpcomingPaymentsDetails;
