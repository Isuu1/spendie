import React from "react";
import dayjs from "dayjs";
//Styles
import styles from "./DashboardRecurringPaymentItem.module.scss";
//Types
import { RecurringPayment } from "@/features/recurring-payments/types/recurring-payment";
//Components
import PaymentStatus from "@/features/recurring-payments/components/PaymentStatus";
import Button from "@/shared/components/ui/Button";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
//Hooks
import { useMarkAsPaid } from "../hooks/useMarkAsPaid";

interface RecurringPaymentItemProps {
  payment: RecurringPayment;
}

const DashboardRecurringPaymentItem: React.FC<RecurringPaymentItemProps> = ({
  payment,
}) => {
  const { mutate, isPending, variables } = useMarkAsPaid();

  const handleMarkAsPaid = async (payment: RecurringPayment) => {
    mutate(payment);
  };

  const formatedDate = (dateStr: string) => {
    return dayjs(dateStr).format("D MMMM YYYY");
  };

  return (
    <div className={styles.paymentItemWrapper}>
      {isPending && variables?.id === payment.id && (
        <div className={styles.processingPayment}>
          <LoadingSpinner />
        </div>
      )}

      <div
        className={`${styles.paymentItem} ${styles[payment.type.toLocaleLowerCase()]}`}
      >
        <div className={styles.details}>
          <span className={styles.name}>{payment.name ?? "Income"}</span>
          <span className={styles.amount}>
            {payment.type === "Income" ? "+£" : "-£"}
            {payment.amount?.toFixed(2) ?? "0.00"}
          </span>
        </div>

        <div className={styles.date}>
          <span>{formatedDate(payment.next_payment_date)}</span>
          <PaymentStatus payment={payment} />
        </div>

        <Button
          className={styles.paidButton}
          variant="secondary"
          size="small"
          onClick={() => handleMarkAsPaid(payment)}
          disabled={isPending && variables?.id === payment.id}
        >
          {isPending && variables?.id === payment.id
            ? "Processing..."
            : "Mark as paid"}
        </Button>
      </div>
    </div>
  );
};

export default DashboardRecurringPaymentItem;
