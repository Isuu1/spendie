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
        "flex items-center gap-5 cursor-pointer w-fit rounded-lg p-3",
        type === "income" && "bg-[rgba(65,179,0,0.1)]",
        type === "expense" && "bg-[rgba(255,0,0,0.1)]",
      )}
      onClick={() => handleToggleDetails(type)}
    >
      <div
        className={cn(
          "w-fit rounded-sm p-2",
          type === "income" && "bg-[#42b30059]",
          type === "expense" && "bg-[#ff000059]",
        )}
      >
        <span
          className={cn(
            type === "income" && "text-[#41b300]",
            type === "expense" && "text-red-600",
          )}
        >
          {icon}
        </span>
      </div>
      <div className="flex flex-col items-start gap-1">
        <span>
          {payments.length}
          {` `}
          Income
        </span>
        <span
          className={cn(
            "text-sm font-medium",
            type === "income" && "text-green-600",
            type === "expense" && "text-red-600",
          )}
        >
          +£{amount.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default PaymentSummaryItem;
