"use client";

import EditPaymentForm from "@/features/recurring-payments/components/EditPaymentForm";
import { useRecurringPayments } from "@/features/recurring-payments/hooks/useRecurringPayments";
import BackButton from "@/shared/components/BackButton";
import ErrorMessage from "@/shared/components/ErrorMessage";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const payments = useRecurringPayments();
  const payment = payments.data?.find((p) => p.id == id);

  if (!payment) {
    return (
      <div className="page">
        <ErrorMessage
          variant="panel"
          message="Could not find the recurring payment you are trying to edit."
        />
      </div>
    );
  }

  return (
    <>
      <BackButton />
      <h3>Edit recurring payment</h3>
      <EditPaymentForm payment={payment} />
    </>
  );
}
