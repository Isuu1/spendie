import React from "react";
import { RecurringPayment } from "../types/recurringPayment";
import PaymentStatus from "./PaymentStatus";
import PaymentCategory from "./PaymentCategory";
import dayjs from "dayjs";
import { Repeat } from "lucide-react";

type PaymentCardProps = {
  payment: RecurringPayment;
};

const PaymentCard = ({ payment }: PaymentCardProps) => {
  return (
    <div className="flex flex-col gap-5 relative">
      <div className="flex items-center justify-between">
        <h3>{payment.name}</h3>
      </div>
      <div className="flex justify-between mt-2">
        <span>
          {payment.type === "Expense" ? "-" : "+"} £{payment.amount.toFixed(2)}
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
        <span className="text-green-500 font-medium">
          {payment.is_paused ? "Paused" : "Active"}
        </span>
      </div>
    </div>
  );
};

export default PaymentCard;
