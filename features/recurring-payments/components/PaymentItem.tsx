"use client";

import React, { useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";
//Types
import { RecurringPayment } from "../types/recurringPayment";
//Components
import PaymentStatus from "./PaymentStatus";
import Button from "@/shared/components/ui/Button";
import ConfirmAction from "@/shared/components/ConfirmAction";
import PaymentCategory from "./PaymentCategory";
//Hooks
import { useDeletePayment } from "../hooks/useDeletePayment";
//Animations
import { AnimatePresence } from "motion/react";
//Icons
import { Repeat } from "lucide-react";

type PaymentItemProps = {
  payment: RecurringPayment;
};

const PaymentItem = ({ payment }: PaymentItemProps) => {
  const [confirmDeletePayment, setConfirmDeletePayment] = useState<
    string | null
  >(null);

  const { mutate } = useDeletePayment();

  const handleDeletePayment = async (paymentId: string) => {
    mutate(paymentId);
    setConfirmDeletePayment(null);
  };

  const formatedDate = (dateStr: Date) => {
    return dayjs(dateStr).format("D MMMM YYYY");
  };

  return (
    <div
      key={payment.id}
      className="flex flex-col gap-5 p-4 bg-card rounded-2xl relative"
    >
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
          {formatedDate(payment.next_payment_date)}
        </span>
      </div>

      <PaymentStatus payment={payment} className="ml-auto" />
      <PaymentCategory category={payment.category} />

      <div className="flex justify-between mt-2 mb-2">
        <span>Status</span>
        <span className="text-green-500 font-medium">[Active]</span>
      </div>

      <div className="flex gap-2">
        <Link href={`/recurring-payments/edit-payment/${payment.id}`}>
          <Button variant="secondary" className="bg-card-foreground" size="sm">
            Edit
          </Button>
        </Link>
        <Button
          variant="secondary"
          className="bg-card-foreground"
          size="sm"
          onClick={() => setConfirmDeletePayment(payment.id)}
        >
          Delete
        </Button>
        <Button variant="secondary" className="bg-card-foreground" size="sm">
          Pause
        </Button>
        <Link href={`/recurring-payments/history/${payment.id}`}>
          <Button variant="secondary" className="bg-card-foreground" size="sm">
            View history
          </Button>
        </Link>
      </div>

      <AnimatePresence>
        {confirmDeletePayment && (
          <ConfirmAction
            title={`Are you sure you want to delete following payment: ${payment.name}?`}
            onCancel={() => setConfirmDeletePayment(null)}
            onConfirm={() => handleDeletePayment(payment.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentItem;
