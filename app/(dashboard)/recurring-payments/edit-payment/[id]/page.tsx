import EditPaymentForm from "@/features/recurring-payments/components/EditPaymentForm";
import ErrorMessage from "@/shared/components/ErrorMessage";
import { createClient } from "@/supabase/server";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: user, error } = await supabase.auth.getUser();

  if (!user || error) {
    return <p>You must be logged in to edit a recurring payment.</p>;
  }

  const { data: payment, error: paymentError } = await supabase
    .from("recurring_payments")
    .select("*")
    .eq("user_id", user.user.id)
    .eq("id", id)
    .single();

  if (paymentError || !payment) {
    console.error("Error fetching payment:", paymentError);
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
      <h2>Edit recurring payment</h2>
      <EditPaymentForm payment={payment} />
    </>
  );
}
