import { createClient } from "@/supabase/server";

export async function getRecurringPayments() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error("Error fetching user from database");
  }

  const { data: userRecurringPayments, error: userRecurringPaymentsError } =
    await supabase
      .from("recurring_payments")
      .select("*")
      .eq("user_id", data.user.id)
      .order("date", { ascending: true });

  if (userRecurringPaymentsError) {
    throw new Error("Error fetching your payments. Try to refresh the page.");
  }
  return userRecurringPayments;
}
