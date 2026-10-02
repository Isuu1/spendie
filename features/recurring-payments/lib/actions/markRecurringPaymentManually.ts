"use server";

import { createClient } from "@/supabase/server";
import { RecurringPayment } from "../../types/recurringPayment";
import { processRecurringPaymentPaid } from "./processRecurringPaymentPaid";

type MarkAsPaidResult = {
  success: boolean;
};

//This function is used to mark a recurring payment as paid manually.
//To be used only if the user wants to mark a payment as paid without using the automatic payment system.
export async function markRecurringPaymentManually(
  payment: RecurringPayment,
): Promise<MarkAsPaidResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  return processRecurringPaymentPaid({
    payment,
    userId: user.id,
  });
}
