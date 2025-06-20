import EditPaymentForm from "@/features/recurring-payments/components/EditPaymentForm";
import PageWrapper from "@/shared/components/PageWrapper";
import { createClient } from "@/supabase/server";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const supabase = await createClient();

  const { data: user, error } = await supabase.auth.getUser();

  if (!user) {
    return <p>You must be logged in to edit a recurring payment.</p>;
  }

  if (error) {
    return <p>Error fetching user: {error.message}</p>;
  }

  const { data: payment } = await supabase
    .from("recurring_payments")
    .select("*")
    .eq("user_id", user.user.id)
    .eq("id", id)
    .single();

  return (
    <PageWrapper>
      <h2>Edit recurring payment</h2>
      <EditPaymentForm payment={payment} />
    </PageWrapper>
  );
}
