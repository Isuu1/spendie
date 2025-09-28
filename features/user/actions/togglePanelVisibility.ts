"use server";

import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function togglePanelVisibility(
  panelName: string,
  isActive: boolean
) {
  console.log("Panel Name:", panelName);
  console.log("Is Active:", isActive);

  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError) {
    console.error("Error fetching user:", authError);
    throw new Error("Failed to fetch user data");
  }

  const userId = authData.user.id;

  const { data: settingsData, error: settingsError } = await supabase
    .from("user_settings")
    .select("visible_panels")
    .eq("user_id", userId)
    .single();

  if (settingsError) {
    console.error("Error fetching user settings:", settingsError);
    return { success: false };
  }

  let visiblePanels: string[] = settingsData.visible_panels || [];

  if (isActive) {
    visiblePanels = visiblePanels.filter((panel) => panel !== panelName);
  } else {
    visiblePanels.push(panelName);
  }

  const { error: updateError } = await supabase
    .from("user_settings")
    .update({ visible_panels: visiblePanels })
    .eq("user_id", userId);

  if (updateError) {
    console.error("Error updating user settings:", updateError);
    return { success: false };
  }

  revalidatePath("/dashboard");

  return { success: true };
}
