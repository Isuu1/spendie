import { createClient } from "@/supabase/client";
import { fetchUserSettings } from "../lib/fetchUserSettings";

export async function getUserSettingsClient() {
  const supabase = createClient();
  return fetchUserSettings(supabase);
}
