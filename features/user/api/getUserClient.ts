import { createClient } from "@/supabase/client";
import { UserProfile } from "../types/user";

export async function getUserClient(): Promise<UserProfile> {
  const supabase = createClient();

  const { data: authUser } = await supabase.auth.getUser();

  if (!authUser?.user) {
    throw new Error("Authentication error: User not found");
  }

  const { data: userProfile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", authUser?.user?.id)
    .single();

  if (error) {
    throw new Error("Error fetching user profile");
  }

  return userProfile;
}
