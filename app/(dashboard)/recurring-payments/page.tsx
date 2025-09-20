import RecurringPaymentsGrid from "@/features/recurring-payments/components/RecurringPaymentsGrid";
import { createClient } from "@/supabase/server";

export default async function Page() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return <div>Error fetching user from database</div>;
  }

  const { data: userRecurringPayments, error: userRecurringPaymentsError } =
    await supabase
      .from("recurring_payments")
      .select("*")
      .eq("user_id", data.user.id)
      .order("date", { ascending: true });

  if (userRecurringPaymentsError) {
    return <div>Error fetching your payments. Try to refresh the page.</div>;
  }

  return (
    <>
      <h2>Recurring payments</h2>
      <RecurringPaymentsGrid recurringPayments={userRecurringPayments} />
    </>
  );
}
