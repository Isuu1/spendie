"use server";

import { getUserServer } from "@/features/user/api/getUserServer";
import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteRecurringPayment(recurringPaymentId: string) {
  const supabase = await createClient();

  const user = await getUserServer();

  // Delete the recurring payment by ID
  const { error } = await supabase
    .from("recurring_payments")
    .delete()
    .eq("user_id", user.id)
    .eq("id", recurringPaymentId);

  if (error) {
    console.error("Error deleting recurring payment:", error);
    throw new Error("Failed to delete recurring payment");
  }

  //Delete associated payment history
  const { error: historyError } = await supabase
    .from("recurring_payments_history")
    .delete()
    .eq("user_id", user.id)
    .eq("payment_id", recurringPaymentId);

  if (historyError) {
    console.error("Error deleting payment history:", historyError);
    throw new Error("Failed to delete payment history");
  }

  //Refresh cached data
  revalidatePath("/recurring-payments");

  return {
    success: true,
  };
}
