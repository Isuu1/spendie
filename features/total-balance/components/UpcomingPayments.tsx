import { RecurringPayment } from "@/shared/types/recurring-payment";
import React, { useState } from "react";

//Styles
import styles from "./UpcomingPayments.module.scss";
//Icons
import { TbArrowBigDownFilled } from "react-icons/tb";
import { TbArrowBigUpFilled } from "react-icons/tb";

interface UpcomingPaymentsProps {
  paymentsTillDate: RecurringPayment[];
}

const UpcomingPayments: React.FC<UpcomingPaymentsProps> = ({
  paymentsTillDate,
}) => {
  const [showUpcomingChangeDetails, setShowUpcomingChangeDetails] = useState<
    string | null
  >(null);

  const handleToggleDetails = (type: string) => {
    if (showUpcomingChangeDetails === type) {
      setShowUpcomingChangeDetails(null);
    } else {
      setShowUpcomingChangeDetails(type);
    }
  };

  return (
    <>
      <div className={styles.upcomingPaymentsContainer}>
        {/* {showUpcomingChangeDetails === "income" && (
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
        )} */}
        {paymentsTillDate.length > 0 &&
          paymentsTillDate.map((payment, idx) => {
            const incomeIconStyle =
              payment.type.toLowerCase() === "income"
                ? styles.incomeIconWrapper
                : styles.expenseIconWrapper;
            return (
              <div
                key={payment.id ?? idx}
                className={`${styles.item} ${payment.type.toLowerCase() === "income" ? styles.income : styles.expense} ${
                  showUpcomingChangeDetails === payment.type
                    ? styles.active
                    : ""
                }`}
                onClick={() => handleToggleDetails(payment.type)}
              >
                <div className={`${styles.iconWrapper} ${incomeIconStyle}`}>
                  <i className={styles.icon}>
                    {payment.type.toLowerCase() === "income" ? (
                      <TbArrowBigUpFilled />
                    ) : (
                      <TbArrowBigDownFilled />
                    )}
                  </i>
                </div>
                <div className={styles.details}>
                  <span>
                    {paymentsTillDate.length}
                    {` `}
                    {payment.type}
                  </span>
                  <span
                    className={`${styles.amount} ${payment.type === "income" ? styles.income : styles.expense}`}
                  >
                    +£{payment.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        {paymentsTillDate.length === 0 && (
          <p className={styles.none}>No upcoming changes</p>
        )}
      </div>
    </>
  );
};

export default UpcomingPayments;
