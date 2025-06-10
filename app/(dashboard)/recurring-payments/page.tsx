import RecurringPaymentsGrid from "@/features/recurring-payments/components/RecurringPaymentsGrid";
import PageWrapper from "@/shared/components/PageWrapper";
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
      .eq("user_id", data.user.id);

  if (userRecurringPaymentsError) {
    return <div>You did not set up any recurring payments yet.</div>;
  }

  return (
    <PageWrapper>
      <h2>Recurring payments</h2>
      <RecurringPaymentsGrid recurringPayments={userRecurringPayments} />
    </PageWrapper>
  );
}
