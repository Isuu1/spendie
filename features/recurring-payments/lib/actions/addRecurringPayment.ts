"use server";

import { createClient } from "@/supabase/server";
import { RecurringPaymentFormState } from "../../types/forms";
import moment from "moment";
import { recurringPaymentSchema } from "../../schemas/forms";

export async function addRecurringPayment(
  prevState: RecurringPaymentFormState,
  formData: FormData
) {
  const supabase = await createClient();

  const amountValue = parseFloat(formData.get("amount") as string);

  const data = {
    name: formData.get("name")?.toString() || "",
    repeat: formData.get("repeat")?.toString() || "",
    amount: amountValue || 0,
    type: formData.get("type")?.toString() || "",
    first_payment_date: formData.get("first_payment_date")?.toString() || "",
  };

  //Validate the form data
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
  const newPayment = {
    user_id: user.user.id,
    add_payment_date: moment().format("YYYY-MM-DD"),
    ...data,
  };

  const { error: updateError } = await supabase
    .from("recurring_payments")
    .insert(newPayment);

  if (updateError) {
    console.error("Error adding recurring payment:", updateError);
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
    message: "Recurring payment added successfully",
    error: null,
  };
}
