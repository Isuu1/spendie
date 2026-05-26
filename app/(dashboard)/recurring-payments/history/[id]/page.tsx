"use client";

import PaymentsHistory from "@/features/recurring-payments/components/PaymentsHistory";
import { useRecurringPayments } from "@/features/recurring-payments/hooks/useRecurringPayments";
import BackButton from "@/shared/components/BackButton";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const { data } = useRecurringPayments();

  const payment = data?.find((payment) => payment.id == id);

  if (!payment) {
    return <div>Payment not found</div>;
  }

  return (
    <>
      <BackButton />
      <h3>
        <strong>{payment.name}</strong> payment history
      </h3>
      <PaymentsHistory payment={payment} />
    </>
  );
}
