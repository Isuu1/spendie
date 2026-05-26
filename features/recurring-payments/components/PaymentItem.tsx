"use client";

import { useState } from "react";
import Link from "next/link";
//Types
import { RecurringPayment } from "../types/recurringPayment";
//Components
import Button from "@/shared/components/ui/Button";
import ConfirmAction from "@/shared/components/ConfirmAction";
import PaymentCard from "./PaymentCard";
import EditPaymentDrawer from "./EditPaymentDrawer";
//Hooks
import { useDeletePayment } from "../hooks/useDeletePayment";
//Animations
import { AnimatePresence } from "motion/react";

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

  return (
    <div key={payment.id} className="bg-card rounded-2xl p-4">
      <PaymentCard payment={payment} />

      <div className="flex gap-2">
        <EditPaymentDrawer payment={payment} />
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
