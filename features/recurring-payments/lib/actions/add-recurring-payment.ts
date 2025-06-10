"use server";

import { createClient } from "@/supabase/server";

import { v4 as uuidv4 } from "uuid";
import { AddPaymentFormState } from "../../types/forms";

import { z } from "zod/v4";

export async function addRecurringPayment(
  prevState: AddPaymentFormState,
  formData: FormData
) {
  const supabase = await createClient();

  const amountValue = formData.get("amount");

  const data = {
    id: uuidv4(),
    name: formData.get("name"),
    repeat: formData.get("repeat"),
    amount: amountValue && parseFloat(amountValue as string),
    type: formData.get("type"),
    date: formData.get("date"),
  };

  //Validate the form data
  const schema = z.object({
    id: z.uuid(),
    name: z.string().min(1, "Name is required"),
    repeat: z.enum(["Monthly", "Yearly", "Weekly", "Daily"], {
      message: "Invalid repeat value",
    }),
    amount: z.number().min(0, "Amount must be a positive number"),
    type: z.enum(["Income", "Expense"], {
      message: "Invalid type value",
    }),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
  });

  // if (!data.name || !data.repeat || !data.amount || !data.type || !data.date) {
  //   return {
  //     success: false,
  //     message: "All fields are required",
  //     error: "All fields are required",
  //   };
  // }
  const validateData = schema.safeParse(data);
  if (!validateData.success) {
    console.error("Validation error:", validateData.error);

    const tree = z.treeifyError(validateData.error);

    console.log("Treeified error:", tree);

    return {
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

  //Get existing recurring payments from the user's profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("recurring_payments")
    .eq("id", user.user.id)
    .single();

  if (profileError) {
    console.error("Error fetching user profile:", profileError);
    throw new Error("Failed to fetch user profile");
  }

  //Update the user's profile with the new recurring payment
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      recurring_payments: [...profile?.recurring_payments, data],
    })
    .eq("id", user.user.id);

  if (updateError) {
    console.error("Error adding recurring payment:", updateError);
    throw new Error("Failed to add recurring payment");
  }

  return {
    success: true,
    message: "Recurring payment added successfully",
    error: null,
  };
}
