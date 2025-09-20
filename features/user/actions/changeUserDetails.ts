"use server";

import { createClient } from "@/supabase/server";
import { getUserServer } from "../api/getUserServer";
import { accountDetailsSchema } from "../schemas/forms";
import { ChangeDetailsFormState } from "../types/forms";

export async function changeUserDetails(
  prevState: ChangeDetailsFormState,
  formData: FormData
): Promise<ChangeDetailsFormState> {
  const name = formData.get("name") as string;
  const surname = formData.get("surname") as string;
  const dob = formData.get("dob") as string;
  const email = formData.get("email") as string;

  try {
    const { user, error } = await getUserServer();

    const supabase = await createClient();

    if (error || !user) {
      console.error("Error fetching user:", error);
      return { success: false, user: null, error: "Failed to fetch user" };
    }

    const result = accountDetailsSchema.safeParse({
      name,
      surname,
      dob,
      email,
    });

    if (!result.success) {
      return {
        success: false,
        user: null,
        error: "Failed to update details, invalid data.",
      };
    }

    const { data: updatedProfile, error: updateError } = await supabase
      .from("profiles")
      .update({
        name: result.data.name,
        surname: result.data.surname,
        dob: result.data.dob,
        email: result.data.email,
      })
      .eq("id", user.id)
      .select()
      .single();

    if (updateError || !updatedProfile) {
      console.error("Error updating profile:", updateError);
      return { success: false, user: null, error: "Failed to update profile" };
    }

    return { success: true, user: user, error: null };
  } catch (error) {
    console.error("Error changing user details:", error);
    return { success: false, user: null, error: "An error occurred" };
  }
}
