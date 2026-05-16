"use server";

import { createClient } from "@/supabase/server";

export async function togglePanelVisibility(panelId: string, visible: boolean) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError) {
    console.error("Error fetching user:", authError);
    throw new Error("Failed to fetch user data");
  }

  const userId = authData.user.id;

  const { data: settingsData, error: settingsError } = await supabase
    .from("user_settings")
    .select("dashboard_layout")
    .eq("user_id", userId)
    .single();

  if (settingsError) {
    console.error("Error fetching user settings:", settingsError);
    return { success: false };
  }

  const layout = Array.isArray(settingsData.dashboard_layout)
    ? settingsData.dashboard_layout
    : [];

  const panels = layout.map((panel) => {
    if (panel.id === panelId) {
      return {
        ...panel,
        visible: !visible,
      };
    }

    return panel;
  });

  const { error: updateError } = await supabase
    .from("user_settings")
    .update({ dashboard_layout: panels })
    .eq("user_id", userId);

  if (updateError) {
    console.error("Error updating user settings:", updateError);
    return { success: false };
  }

  return { success: true };
}
