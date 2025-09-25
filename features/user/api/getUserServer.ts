import { createClient } from "@/supabase/server";
import { fetchUser } from "../lib/fetchUser";

export async function getUserServer() {
  const supabase = await createClient();
  return fetchUser(supabase);
}
