"use client";
import { createClient } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { UserSettings } from "../types/user";

export function useUserSettingsClient() {
  const supabase = createClient();
  return useQuery({
    queryKey: ["userSettings"],
    queryFn: async () => {
      const { data: authUser, error: authError } =
        await supabase.auth.getUser();

      if (authError || !authUser?.user) {
        console.error("Error fetching user:", authError);
        return;
      }

      const { data, error: settingsError } = await supabase
        .from("user_settings")
        .select("*")
        .eq("user_id", authUser?.user?.id)
        .single();

      if (settingsError) {
        console.error("Error fetching user settings:", settingsError);
        return;
      }

      return data as UserSettings;
    },
  });
}
