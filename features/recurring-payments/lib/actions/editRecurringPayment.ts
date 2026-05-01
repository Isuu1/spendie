"use server";

import { createClient } from "@/supabase/server";
import { recurringPaymentSchema } from "@/features/recurring-payments/schemas/recurringPaymentSchema";
import z from "zod";
import { getUserServer } from "@/features/user/api/getUserServer";

export async function editRecurringPayment(
  data: z.infer<typeof recurringPaymentSchema>,
  paymentId: string,
) {
  const user = await getUserServer();

  const supabase = await createClient();

  if (!user) return { success: false, error: "Unauthorized" };

  //Validate the form data
  const result = recurringPaymentSchema.safeParse(data);

  if (!result.success)
    return { success: false, error: "Unable to validate form data" };

  // Create the new payment object with user_id
  const editedPayment = { ...data, user_id: user.id };

  const { error: updateError } = await supabase
    .from("recurring_payments")
    .update(editedPayment)
    .eq("id", paymentId);

  if (updateError)
    return {
      success: false,
      error: updateError.message || "Failed to update recurring payment",
    };

  return { success: true };
}
