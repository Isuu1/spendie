"use server";

import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";
import { loginFormSchema } from "../../schemas/forms";
import z from "zod";

export async function login(data: z.infer<typeof loginFormSchema>) {
  try {
    const supabase = await createClient();

    if (!data.email || !data.password)
      return { success: false, error: "Email and password are required" };

    const result = loginFormSchema.safeParse(data);

    if (!result.success) return { success: false, error: "Invalid data" };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) return { success: false, error: error.message };

    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, error: "Server error" };
  }
}
