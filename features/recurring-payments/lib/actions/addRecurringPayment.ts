"use server";

import { createClient } from "@/supabase/server";
import { recurringPaymentSchema } from "../../schemas/recurringPaymentSchema";
import dayjs from "dayjs";
import z from "zod";

export async function addRecurringPayment(
  data: z.infer<typeof recurringPaymentSchema>,
) {
  const supabase = await createClient();

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
    add_payment_date: dayjs().format("YYYY-MM-DD"),
    //next_payment_date: data.next_payment_date,
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
