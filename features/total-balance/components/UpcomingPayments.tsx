import { RecurringPayment } from "@/shared/types/recurring-payment";
import React, { useState } from "react";

//Styles
import styles from "./UpcomingPayments.module.scss";

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

  return (
    <>
      {showUpcomingChangeDetails && (
        <div className={styles.detailsModal}>
          <div className={styles.modalContent}>
            <h3>
              Upcoming{" "}
              {showUpcomingChangeDetails === "income" ? "Incomes" : "Expenses"}
            </h3>
          </div>
        </div>
      )}
      <div className={styles.upcomingPayments}>
        {income > 0 && (
          <div
            className={styles.upcomingIncomes}
            onClick={() => setShowUpcomingChangeDetails("income")}
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
            onClick={() => setShowUpcomingChangeDetails("expense")}
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
