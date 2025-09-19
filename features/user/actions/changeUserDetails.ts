"use server";

import { createClient } from "@/supabase/server";

export async function changeUserDetails(formData: FormData) {
  const name = formData.get("name") as string;
  const surname = formData.get("surname") as string;
  const dob = formData.get("dob") as string;
  const email = formData.get("email") as string;

  try {
    const supabase = await createClient();
    const { data: user, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching user:", error);
      return;
    }
    console.log("Current user:", user);
    const { data: userProfile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user?.user?.id)
      .single();
    if (profileError) {
      console.error("Error fetching user profile:", profileError);
      return;
    }

    console.log("User profile:", userProfile);
  } catch (error) {
    console.error("Error fetching user:", error);
  }

  // Perform server-side logic to change user details
  console.log("Changing user details to:", { name, surname, dob, email });
}
