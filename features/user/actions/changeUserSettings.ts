"use server";

import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function changeUserSettings(tileName: string, isActive: boolean) {
  console.log("Tile Name:", tileName);
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
    .select("visible_tiles")
    .eq("user_id", userId)
    .single();

  if (settingsError) {
    console.error("Error fetching user settings:", settingsError);
    throw new Error("Failed to fetch user settings");
  }

  let visibleTiles: string[] = settingsData.visible_tiles || [];

  if (isActive) {
    visibleTiles = visibleTiles.filter((tile) => tile !== tileName);
  } else {
    visibleTiles.push(tileName);
  }

  const { error: updateError } = await supabase
    .from("user_settings")
    .update({ visible_tiles: visibleTiles })
    .eq("user_id", userId);

  if (updateError) {
    console.error("Error updating user settings:", updateError);
    throw new Error("Failed to update user settings");
  }

  revalidatePath("/dashboard");

  return { success: true };
}
