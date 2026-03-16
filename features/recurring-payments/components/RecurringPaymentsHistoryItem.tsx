import dayjs from "dayjs";
import clsx from "clsx";
//Types
import { RecurringPaymentHistory } from "../types/recurring-payment";
//Components
import PaymentHistoryStatus from "./PaymentHistoryStatus";
//Icons
import { TbArrowBigDownFilled } from "react-icons/tb";
import { TbArrowBigUpFilled } from "react-icons/tb";
//Styles
import styles from "./RecurringPaymentsHistoryItem.module.scss";

interface RecurringPaymentsHistoryItemProps {
  payment: RecurringPaymentHistory;
}

const RecurringPaymentsHistoryItem = ({
  payment,
}: RecurringPaymentsHistoryItemProps) => {
  return (
    <ul key={payment.id} className={styles.historyItem}>
      <i
        className={clsx(styles.icon, {
          [styles.incomeIcon]: payment.type === "Income",
          [styles.expenseIcon]: payment.type === "Expense",
        })}
      >
        {payment.type === "Income" ? (
          <TbArrowBigUpFilled />
        ) : (
          <TbArrowBigDownFilled />
        )}
      </i>

      <li>£{payment.amount}</li>
      <li>{dayjs(payment.payment_date).format("DD MMM YYYY")}</li>
      <li>{dayjs(payment.paid_date).format("DD MMM YYYY")}</li>
      <PaymentHistoryStatus paymentHistory={payment} />
    </ul>
  );
};

export default RecurringPaymentsHistoryItem;
