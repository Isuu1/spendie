import { getRecurringPayments } from "@/features/recurring-payments/api/getRecurringPayments";
import RecurringPaymentsGrid from "@/features/recurring-payments/components/RecurringPaymentsGrid";

export default async function Page() {
  const { recurringPayments, error } = await getRecurringPayments();

  if (error) {
    return <div>Error fetching your payments. Try to refresh the page.</div>;
  }

  return (
    <>
      <h2>Recurring payments</h2>
      <RecurringPaymentsGrid recurringPayments={recurringPayments} />
    </>
  );
}
