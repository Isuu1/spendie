"use server";

import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

import { v4 as uuidv4 } from "uuid";

export async function addRecurringPayment(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const data = {
    id: uuidv4(),
    name: formData.get("name"),
    repeat: formData.get("repeat"),
    amount: formData.get("amount"),
    type: formData.get("type"),
    date: formData.get("date"),
  };

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

  redirect("/recurring-payments");
}
