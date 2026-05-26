"use server";

import { getUserServer } from "@/features/user/api/getUserServer";
import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function changePaymentStatus(
  paymentId: string,
  isPaused: boolean,
) {
  const supabase = await createClient();

  const user = await getUserServer();

  // Update the is_paused status of the recurring payment
  const { error } = await supabase
    .from("recurring_payments")
    .update({ is_paused: isPaused })
    .eq("user_id", user.id)
    .eq("id", paymentId);

  if (error) {
    console.error("Error updating payment status:", error);
    throw new Error("Failed to update payment status");
  }

  //Refresh cached data
  revalidatePath("/recurring-payments");

  return {
    success: true,
  };
}
