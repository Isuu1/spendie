import { cn } from "@/shared/lib/cn";
//Types
import { RecurringPaymentHistory } from "../types/recurringPayment";
//Icons
import { CircleCheck, Clock } from "lucide-react";

type PaymentHistoryStatusProps = {
  paymentHistory: RecurringPaymentHistory;
};

const PaymentHistoryStatus = ({
  paymentHistory,
}: PaymentHistoryStatusProps) => {
  if (paymentHistory.status === "On time") {
    return (
      <li
        className={cn(
          "p-2 rounded-md w-fit flex items-center gap-2 text-xs",
          "bg-green-800",
        )}
      >
        <CircleCheck size={16} /> {paymentHistory.status}
      </li>
    );
  }
  return (
    <li
      className={cn(
        "p-2 rounded-md w-fit flex items-center gap-2 text-xs",
        "bg-red-800",
      )}
    >
      <Clock size={16} /> {paymentHistory.status}
    </li>
  );
};

export default PaymentHistoryStatus;
