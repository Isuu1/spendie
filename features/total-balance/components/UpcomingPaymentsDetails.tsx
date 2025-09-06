import { RecurringPayment } from "@/shared/types/recurring-payment";
import React from "react";
//Styles
import styles from "./UpcomingPaymentsDetails.module.scss";
import moment from "moment";

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
  console.log("toggleDetails:", toggleDetails);
  console.log("paymentsTillDate:", paymentsTillDate);

  const filteredPayments = paymentsTillDate?.filter(
    (p) => p.type.toLowerCase() === type
  );

  return (
    <div className={styles.paymentsList}>
      {filteredPayments?.map((payment, idx) => (
        <div key={payment.id ?? idx} className={styles.paymentItem}>
          <div className={styles.details}>
            <span>{payment.name ?? "Income"}</span>
            <span>{moment(payment.date).format("DD MMM `YY")}</span>
          </div>
          <div className={styles.amount}>
            £{payment.amount?.toFixed(2) ?? "0.00"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingPaymentsDetails;
