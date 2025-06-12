"use server";

import { createClient } from "@/supabase/server";
import { AddPaymentFormState } from "../../types/forms";
import { z } from "zod/v4";

export async function editRecurringPayment(
  paymentId: string,
  prevState: AddPaymentFormState,
  formData: FormData
) {
  const supabase = await createClient();

  const amountValue = formData.get("amount");

  const data = {
    name: formData.get("name")?.toString() || "",
    repeat: formData.get("repeat")?.toString() || "",
    amount: (amountValue && parseFloat(amountValue as string)) || 0,
    type: formData.get("type")?.toString() || "",
    date: formData.get("date")?.toString() || "",
  };

  //Validate the form data
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    repeat: z.enum(["Monthly", "Yearly", "Weekly", "Daily"], {
      message: "Invalid repeat value",
    }),
    amount: z.number().min(1, "Amount must be a positive number"),
    type: z.enum(["Income", "Expense"], {
      message: "Invalid type value",
    }),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
  });

  const validateData = schema.safeParse(data);

  if (!validateData.success) {
    const tree = z.treeifyError(validateData.error);
    return {
      data,
      success: false,
      message: "Validation error",
      error: tree.properties,
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
      error: { general: { errors: ["Unable to save recurring payment"] } },
    };
  }

  return {
    data,
    success: true,
    message: "Recurring payment updated successfully",
    error: null,
  };
}
