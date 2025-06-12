"use server";

import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteRecurringPayment(recurringPaymentId: string) {
  const supabase = await createClient();

  // Delete the recurring payment by ID
  const { error } = await supabase
    .from("recurring_payments")
    .delete()
    .eq("id", recurringPaymentId);

  if (error) {
    console.error("Error deleting recurring payment:", error);
    return {
      success: false,
      message: "Failed to delete recurring payment",
      error: error.message,
    };
  }

  //Refresh cached data
  revalidatePath("/recurring-payments");

  return {
    success: true,
    message: "Recurring payment deleted successfully",
  };
}
