import { RecurringPayment } from "@/shared/types/recurring-payment";
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
      {recurringPayments.map((payment: RecurringPayment) => (
        <div key={payment.id}>
          <h3>{payment.name}</h3>
          <p>{payment.date}</p>
          {/* <p>Frequency: {order.frequency}</p> */}
          <p>{payment.type}</p>
          {/* <p>Status: {order.status}</p> */}
          <p>{payment.amount}</p>
        </div>
      ))}
    </div>
  );
}
