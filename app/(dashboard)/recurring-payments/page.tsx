import RecurringPaymentsGrid from "@/features/recurring-payments/components/RecurringPaymentsGrid";
import { createClient } from "@/supabase/server";

export default async function Page() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return <div>Error fetching standing orders</div>;
  }

  const userRecurringPayments = await supabase
    .from("profiles")
    .select("recurring_payments")
    .eq("id", data.user.id);

  if (userRecurringPayments.error) {
    return <div>You did not set up any recurring payments yet.</div>;
  }

  const { recurring_payments: recurringPayments } =
    userRecurringPayments.data[0];

  return (
    <div>
      <RecurringPaymentsGrid recurringPayments={recurringPayments} />
    </div>
  );
}
