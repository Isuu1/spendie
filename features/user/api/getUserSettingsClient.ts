import { createClient } from "@/supabase/client";
import { UserSettings } from "../types/user";

export async function getUserSettingsClient(): Promise<UserSettings> {
  const supabase = createClient();

  const { data: authUser } = await supabase.auth.getUser();

  if (!authUser?.user) {
    throw new Error("Authentication error: User not found");
  }

  const { data: userSettings, error } = await supabase
    .from("user_settings")
    .select("*")
    .eq("user_id", authUser?.user?.id)
    .single();

  if (error) {
    throw new Error("Error fetching user settings");
  }

  return userSettings;
}
