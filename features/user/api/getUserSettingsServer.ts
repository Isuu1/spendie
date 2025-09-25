import { createClient } from "@/supabase/server";
import { fetchUserSettings } from "../lib/fetchUserSettings";

export async function getUserSettingsServer() {
  const supabase = await createClient();
  return fetchUserSettings(supabase);
}
