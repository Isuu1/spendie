import { getRecurringPayments } from "@/features/recurring-payments/api/getRecurringPayments";
import RecurringPaymentsGrid from "@/features/recurring-payments/components/RecurringPaymentsGrid";

export default async function Page() {
  const { recurringPayments, error } = await getRecurringPayments();
  //No error handling needed here as it is handled in the grid component to show the most of the UI

  return (
    <div className="page">
      <h2>Recurring payments</h2>
      <RecurringPaymentsGrid
        recurringPayments={recurringPayments || []}
        error={error}
      />
    </div>
  );
}
