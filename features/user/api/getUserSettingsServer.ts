import { createClient } from "@/supabase/server";

export async function getUserSettingsServer() {
  const supabase = await createClient();
  const { data: authUser, error: authError } = await supabase.auth.getUser();
  if (authError || !authUser?.user) {
    console.error("Error fetching user:", authError);
    return { error: authError, user: null };
  }

  const { data: userSettings, error: settingsError } = await supabase
    .from("user_settings")
    .select("*")
    .eq("user_id", authUser?.user?.id)
    .single();
  if (settingsError) {
    console.error("Error fetching user settings:", settingsError);
    return { error: settingsError, settings: null };
  }

  return { error: null, settings: userSettings };
}
