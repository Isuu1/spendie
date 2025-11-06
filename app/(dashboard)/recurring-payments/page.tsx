import { getPaymentsHistory } from "@/features/recurring-payments/api/getPaymentsHistory";
import { getRecurringPaymentsServer } from "@/features/recurring-payments/api/getRecurringPaymentsServer";
import RecurringPaymentsGrid from "@/features/recurring-payments/components/RecurringPaymentsGrid";

export default async function Page() {
  const { recurringPayments, error } = await getRecurringPaymentsServer();
  const { paymentsHistory, error: historyError } = await getPaymentsHistory();
  //No error handling needed here as it is handled in the grid component to show the most of the UI

  return (
    <div className="page">
      <h2>Recurring payments</h2>
      <RecurringPaymentsGrid
        recurringPayments={recurringPayments || []}
        paymentsHistory={paymentsHistory || []}
        error={error || historyError}
      />
    </div>
  );
}
