import { RecurringPayment } from "@/features/recurring-payments/types/recurringPayment";
import { cn } from "@/shared/lib/cn";

type PaymentItemProps = {
  type: "income" | "expense";
  handleToggleDetails: (type: "income" | "expense" | null) => void;
  payments: RecurringPayment[];
  amount: number;
  icon?: React.ReactNode;
};

const PaymentSummaryItem = ({
  type,
  handleToggleDetails,
  payments,
  amount,
  icon,
}: PaymentItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-1 cursor-pointer w-full rounded-2xl px-3 py-2",
        //"bg-[linear-gradient(120deg,rgba(34,37,46,1)_0%,rgba(46,49,58,1)_100%)]",
        "bg-background",
      )}
      onClick={() => handleToggleDetails(type)}
    >
      {/* <div
        className={cn(
          "w-fit rounded-lg p-1",
          type === "income" && "bg-green-600/60",
          type === "expense" && "bg-red-600/60",
        )}
      > */}
      <span
        className={cn(
          type === "income" && "text-green-600",
          type === "expense" && "text-red-600",
        )}
      >
        {icon}
      </span>
      {/* </div> */}
      <div className="flex items-start justify-between grow gap-1">
        <span
          className={cn(
            "text-sm",
            type === "income" && "text-green-600",
            type === "expense" && "text-red-600",
          )}
        >
          ${amount.toFixed(2)}
        </span>
        <span className="text-sm text-secondary">
          {payments.length}
          {payments.length === 1 ? " payment" : " payments"}
        </span>
      </div>
    </div>
  );
};

export default PaymentSummaryItem;
