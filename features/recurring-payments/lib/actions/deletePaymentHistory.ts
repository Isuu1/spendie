"use server";

import { getUserServer } from "@/features/user/api/getUserServer";
import { createClient } from "@/supabase/server";

export async function deletePaymentHistory(id: string) {
  const supabase = await createClient();

  const user = await getUserServer();

  if (!user) {
    throw new Error("User not found");
  }

  const data = await supabase
    .from("recurring_payments_history")
    .delete()
    .eq("user_id", user.id)
    .eq("id", id);

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data;
}
