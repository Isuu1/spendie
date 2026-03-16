import React from "react";
//Styles
import styles from "./RecurringPaymentsHistory.module.scss";
//Hooks
import { useRecurringPaymentsHistory } from "../hooks/useRecurringPaymentsHistory";
import { usePagination } from "@/shared/hooks/usePagination";
//Types
import { RecurringPayment } from "../types/recurring-payment";
//Components
import Pagination from "@/shared/components/Pagination";
import ConfirmAction from "@/shared/components/ConfirmAction";
import RecurringPaymentsHistoryItem from "./RecurringPaymentsHistoryItem";

interface RecurringPaymentsHistoryProps {
  payment: RecurringPayment;
}

const RecurringPaymentsHistory: React.FC<RecurringPaymentsHistoryProps> = ({
  payment,
}) => {
  const [confirmClear, setConfirmClear] = React.useState(false);
  const [sortedBy, setSortedBy] = React.useState("All");
  const { data = [], error } = useRecurringPaymentsHistory();

  const paymentHistory = React.useMemo(() => {
    return data.filter((history) => history.payment_id === payment.id);
  }, [data, payment.id]);

  //Filter history based on sortedBy state
  const filteredHistory = React.useMemo(() => {
    if (sortedBy === "Late") {
      return paymentHistory.filter((history) =>
        history.status.startsWith("Late"),
      );
    }
    if (sortedBy === "On time") {
      return paymentHistory.filter((history) => history.status === "On time");
    }

    return paymentHistory;
  }, [sortedBy, paymentHistory]);

  const { page, setPage, totalPages, currentItems } = usePagination(
    filteredHistory,
    4,
  );

  //Reset to page 1 when sortedBy changes
  React.useEffect(() => {
    setPage(1);
  }, [sortedBy, setPage]);

  if (error) {
    return <div>Error loading payment history</div>;
  }

  if (paymentHistory.length === 0) {
    return (
      <div className={styles.historyWrapper}>
        <p>
          Looks like you don`t have any payment history for {payment.name} yet.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.historyWrapper}>
      <div className="flex-row-space-between">
        <ul className={styles.menu}>
          <li
            className={sortedBy === "All" ? styles.active : ""}
            onClick={() => setSortedBy("All")}
          >
            All
          </li>
          <li
            className={sortedBy === "Late" ? styles.active : ""}
            onClick={() => setSortedBy("Late")}
          >
            Late
          </li>
          <li
            className={sortedBy === "On time" ? styles.active : ""}
            onClick={() => setSortedBy("On time")}
          >
            On time
          </li>
        </ul>
        <p className={styles.clear} onClick={() => setConfirmClear(true)}>
          Clear history
        </p>
      </div>

      <div className={styles.historyContainer}>
        <ul className={styles.historyHeader}>
          <li></li>
          <li>Amount</li>
          <li>Due by</li>
          <li>Paid date</li>
          <li>Status</li>
        </ul>
        {currentItems.map((history) => (
          <RecurringPaymentsHistoryItem key={history.id} payment={history} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          page={page}
          onPageChange={setPage}
          totalPages={totalPages}
        />
      )}

      {confirmClear && (
        <ConfirmAction
          message="Are you sure you want to clear the history?"
          onCancel={() => setConfirmClear(false)}
          onConfirm={() => {}}
        />
      )}
    </div>
  );
};

export default RecurringPaymentsHistory;
