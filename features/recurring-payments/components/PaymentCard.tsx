import React from "react";
import { RecurringPayment } from "../types/recurringPayment";
import PaymentStatus from "./PaymentStatus";
import PaymentCategory from "./PaymentCategory";
import dayjs from "dayjs";
import { Repeat } from "lucide-react";
import { formatAmount } from "@/shared/lib/utils/formatAmount";
import { useUserSettings } from "@/features/user/hooks/useUserSettings";

type PaymentCardProps = {
  payment: RecurringPayment;
};

const PaymentCard = ({ payment }: PaymentCardProps) => {
  const { data: settings } = useUserSettings();

  const formattedAmount = formatAmount(
    payment.amount,
    settings?.currency ?? "",
  ).displayAmount;

  return (
    <div className="flex flex-col gap-5 relative">
      <h3>{payment.name}</h3>

      <div className="flex justify-between mt-2">
        <span
          className={`font-semibold px-3 py-1 rounded-md ${payment.type === "Expense" ? "bg-red-800" : "bg-green-700"}`}
        >
          {payment.type === "Expense" ? "-" : "+"} {formattedAmount}
        </span>
        <span className="flex items-center gap-2">
          <Repeat size={16} />
          {payment.repeat}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span>Next</span>
        <span className="whitespace-nowrap">
          {dayjs(payment.next_payment_date).format("D MMMM YYYY")}
        </span>
      </div>

      <PaymentStatus payment={payment} className="ml-auto" />
      <PaymentCategory category={payment.category} />

      <div className="flex justify-between mt-2 mb-4">
        <span>Status</span>
        {payment.is_paused ? (
          <span className="text-red-500">Paused</span>
        ) : (
          <span className="text-green-500">Active</span>
        )}
      </div>
    </div>
  );
};

export default PaymentCard;
