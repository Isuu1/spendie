import { createClient } from "@/supabase/client";

export async function getUserClient() {
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }
  const { data: userProfile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.user?.id)
    .single();
  if (profileError) {
    console.error("Error fetching user profile:", profileError);
    return null;
  }
  return userProfile;
}
