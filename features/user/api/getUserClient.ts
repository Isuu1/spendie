import { createClient } from "@/supabase/client";
import { fetchUser } from "../lib/fetchUser";

export async function getUserClient() {
  const supabase = createClient();
  return fetchUser(supabase);
}
