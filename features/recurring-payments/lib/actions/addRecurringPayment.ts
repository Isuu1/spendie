"use server";

import { createClient } from "@/supabase/server";
import { recurringPaymentSchema } from "../../schemas/recurringPaymentSchema";
import dayjs from "dayjs";
import z from "zod";
import { getUserServer } from "@/features/user/api/getUserServer";

export async function addRecurringPayment(
  data: z.infer<typeof recurringPaymentSchema>,
) {
  const user = await getUserServer();

  const supabase = await createClient();

  if (!user) return { success: false, error: "Unauthorized" };

  //Validate the form data
  const result = recurringPaymentSchema.safeParse(data);

  if (!result.success)
    return { success: false, error: "Unable to validate form data" };

  // Create the new payment object with user_id
  const newPayment = {
    user_id: user.id,
    add_payment_date: dayjs().format("YYYY-MM-DD"),
    ...data,
  };

  const { error: updateError } = await supabase
    .from("recurring_payments")
    .insert(newPayment);

  if (updateError)
    return {
      success: false,
      error: updateError.message || "Failed to add recurring payment",
    };

  return { success: true };
}
