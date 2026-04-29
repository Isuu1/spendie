"use server";

import { createClient } from "@/supabase/server";
import { recurringPaymentSchema } from "@/features/recurring-payments/schemas/recurringPaymentSchema";
import z from "zod";

export async function editRecurringPayment(
  data: z.infer<typeof recurringPaymentSchema>,
  paymentId: string,
) {
  const supabase = await createClient();

  const validateData = recurringPaymentSchema.safeParse(data);

  if (!validateData.success) {
    return {
      data,
      success: false,
      message: "Validation error",
      error: "Unable to validate form data",
    };
  }

  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error("Error fetching user:", userError);
    throw new Error("Failed to fetch user");
  }

  // Create the new payment object with user_id
  const editedPayment = { ...data, user_id: user.user.id };

  const { error: updateError } = await supabase
    .from("recurring_payments")
    .update(editedPayment)
    .eq("id", paymentId);

  if (updateError) {
    console.error("Error saving recurring payment:", updateError);
    return {
      data,
      success: false,
      message: "Failed to save payment. Please try again.",
      error: "Unable to save recurring payment",
    };
  }

  return {
    data,
    success: true,
    message: "Recurring payment updated successfully",
    error: null,
  };
}
