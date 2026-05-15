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
        "flex items-center gap-2 cursor-pointer w-full rounded-lg p-2 bg-card",
      )}
      onClick={() => handleToggleDetails(type)}
    >
      <div
        className={cn(
          "w-fit rounded-sm p-1.5",
          type === "income" && "bg-green-600/20",
          type === "expense" && "bg-red-600/20",
        )}
      >
        <span
          className={cn(
            type === "income" && "text-green-600",
            type === "expense" && "text-red-600",
          )}
        >
          {icon}
        </span>
      </div>
      <div className="flex items-start justify-between grow gap-1">
        <span className="text-sm text-secondary">
          {payments.length}
          {payments.length === 1 ? " payment" : " payments"}
        </span>
        <span
          className={cn(
            "text-sm font-medium",
            type === "income" && "text-green-600",
            type === "expense" && "text-red-600",
          )}
        >
          {type === "income" ? "+" : "-"}£{amount.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default PaymentSummaryItem;
