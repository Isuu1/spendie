import clsx from "clsx";
//Types
import { RecurringPaymentHistory } from "../types/recurring-payment";
//Icons
import { BsHandThumbsUpFill } from "react-icons/bs";
import { MdWatchLater } from "react-icons/md";
//Styles
import styles from "./PaymentHistoryStatus.module.scss";

interface PaymentHistoryStatusProps {
  paymentHistory: RecurringPaymentHistory;
}

const PaymentHistoryStatus = ({
  paymentHistory,
}: PaymentHistoryStatusProps) => {
  if (paymentHistory.status === "On time") {
    return (
      <li className={clsx(styles.status, styles.onTime)}>
        <BsHandThumbsUpFill /> {paymentHistory.status}
      </li>
    );
  }
  return (
    <li className={clsx(styles.status, styles.late)}>
      <MdWatchLater /> {paymentHistory.status}
    </li>
  );
};

export default PaymentHistoryStatus;
