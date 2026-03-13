import { createClient } from "@/supabase/server";
import { Transaction } from "../types/transaction";

export async function getTransactionsServer(): Promise<Transaction[]> {
  try {
    const supabase = await createClient();

    const { data: authData } = await supabase.auth.getUser();

    if (!authData.user) {
      throw new Error("Failed to fetch user data");
    }

    const userId = authData.user.id;

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false });

    if (error) {
      throw new Error("Failed to fetch transactions");
    }

    return data ?? [];
  } catch (error) {
    throw new Error(
      ` Error in getTransactionsServer: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
