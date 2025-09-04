import { RecurringPayment } from "@/shared/types/recurring-payment";
import React, { useState } from "react";

//Styles
import styles from "./UpcomingPayments.module.scss";
import moment from "moment";

interface UpcomingPaymentsProps {
  paymentsTillDate: RecurringPayment[];
  income: number;
  expense: number;
}

const UpcomingPayments: React.FC<UpcomingPaymentsProps> = ({
  paymentsTillDate,
  income,
  expense,
}) => {
  const [showUpcomingChangeDetails, setShowUpcomingChangeDetails] = useState<
    string | null
  >(null);

  console.log("paymentsTillDate", paymentsTillDate);
  console.log("upcoming change details", showUpcomingChangeDetails);

  const handleToggleDetails = (type: string) => {
    if (showUpcomingChangeDetails === type) {
      setShowUpcomingChangeDetails(null);
    } else {
      setShowUpcomingChangeDetails(type);
    }
  };

  return (
    <>
      <div className={styles.upcomingPayments}>
        {showUpcomingChangeDetails === "income" && (
          <div className={styles.paymentsList}>
            {paymentsTillDate
              .filter((p) => p.type.toLowerCase() === "income")
              .map((payment, idx) => (
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
        )}
        {showUpcomingChangeDetails === "expense" && (
          <div className={styles.paymentsList}>
            {paymentsTillDate
              .filter((p) => p.type.toLowerCase() === "expense")
              .map((payment, idx) => (
                <div key={payment.id ?? idx} className={styles.paymentItem}>
                  <div className={styles.details}>
                    <span>{payment.name ?? "Expense"}</span>
                    <span>£{payment.amount?.toFixed(2) ?? "0.00"}</span>
                  </div>
                  <div className={styles.amount}>
                    {moment(payment.date).format("DD MMM `YY")}
                  </div>
                </div>
              ))}
          </div>
        )}
        {income > 0 && (
          <div
            className={`${styles.upcomingIncomes} ${
              showUpcomingChangeDetails === "income" ? styles.active : ""
            }`}
            onClick={() => handleToggleDetails("income")}
          >
            {
              paymentsTillDate.filter((p) => p.type.toLowerCase() === "income")
                .length
            }{" "}
            income – £{income.toFixed(2)}
          </div>
        )}
        {expense > 0 && (
          <div
            className={styles.upcomingExpenses}
            onClick={() => handleToggleDetails("expense")}
          >
            {
              paymentsTillDate.filter((p) => p.type.toLowerCase() === "expense")
                .length
            }{" "}
            expense - £{expense.toFixed(2)}
          </div>
        )}
        {income === 0 && expense === 0 && (
          <p className={styles.noChanges}>No upcoming changes</p>
        )}
      </div>
    </>
  );
};

export default UpcomingPayments;
