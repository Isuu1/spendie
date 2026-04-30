"use server";

import { createClient } from "@/supabase/server";
import { getUserServer } from "../../api/getUserServer";
import { accountDetailsSchema } from "../../schemas/accountDetailsSchema";
import z from "zod";
import { revalidatePath } from "next/cache";

export async function changeUserDetails(
  data: z.infer<typeof accountDetailsSchema>,
) {
  try {
    const user = await getUserServer();

    const supabase = await createClient();

    if (!user) return { success: false, error: "Unauthorized" };

    const result = accountDetailsSchema.safeParse(data);

    if (!result.success) return { success: false, error: "Invalid data" };

    const { error: updateError } = await supabase
      .from("profiles")
      .update(result.data)
      .eq("id", user.id)
      .select()
      .single();

    if (updateError) {
      if (updateError.code === "23505")
        return { success: false, error: "Email already in use" };
      return { success: false, error: "Update failed" };
    }

    revalidatePath("/user");
    return { success: true };
  } catch (error) {
    console.error("Error changing user details:", error);
    return { success: false, error: "Server error" };
  }
}
