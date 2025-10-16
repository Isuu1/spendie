"use server";

import { createClient } from "@/supabase/server";
import {
  PaymentType,
  RecurringPaymentFormState,
  Repeat,
} from "@/features/recurring-payments/types/forms";
import { recurringPaymentSchema } from "@/features/recurring-payments/schemas/forms";

export async function editRecurringPayment(
  paymentId: string,
  prevState: RecurringPaymentFormState,
  formData: FormData
) {
  const supabase = await createClient();

  const amountValue = formData.get("amount");

  const data = {
    name: formData.get("name")?.toString() || "",
    repeat: formData.get("repeat") as Repeat,
    amount: (amountValue && parseFloat(amountValue as string)) || 0,
    type: formData.get("type") as PaymentType,
    first_payment_date: formData.get("first_payment_date")?.toString() || "",
  };

  const validateData = recurringPaymentSchema.safeParse(data);

  console.log("validateData", validateData);

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
