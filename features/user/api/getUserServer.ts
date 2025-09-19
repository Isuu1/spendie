import { createClient } from "@/supabase/server";

export async function getUserServer() {
  const supabase = await createClient();

  const { data: authUser, error: authError } = await supabase.auth.getUser();
  if (authError || !authUser?.user) {
    console.error("Error fetching user:", authError);
    return { error: authError, user: null };
  }

  const { data: userProfile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", authUser?.user?.id)
    .single();
  if (profileError) {
    console.error("Error fetching user profile:", profileError);
    return { error: profileError, user: null };
  }

  return { error: null, user: userProfile };
}
