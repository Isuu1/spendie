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
import { useChangePaymentStatus } from "../hooks/useChangePaymentStatus";

type PaymentItemProps = {
  payment: RecurringPayment;
};

const PaymentItem = ({ payment }: PaymentItemProps) => {
  const [confirmDeletePayment, setConfirmDeletePayment] = useState<
    string | null
  >(null);

  const { mutate: deletePayment } = useDeletePayment();
  const { mutate: changeStatus } = useChangePaymentStatus();

  const handleDeletePayment = async (paymentId: string) => {
    deletePayment(paymentId);
    setConfirmDeletePayment(null);
  };

  const handlePaymentStatusToggle = () => {
    changeStatus({ paymentId: payment.id, isPaused: !payment.is_paused });
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
        <Button
          variant="secondary"
          className="bg-card-foreground"
          size="sm"
          onClick={handlePaymentStatusToggle}
        >
          {payment.is_paused ? "Resume" : "Pause"}
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
