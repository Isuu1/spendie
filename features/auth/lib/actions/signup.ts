"use server";

import { createClient } from "@/supabase/server";
import { signupFormSchema } from "../../schemas/forms";
import z from "zod";

export async function signup(data: z.infer<typeof signupFormSchema>) {
  try {
    const supabase = await createClient();

    const result = signupFormSchema.safeParse(data);

    if (!result.success) return { success: false, error: "Invalid data" };

    // Include all initial user data in metadata to insert them into database
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {},
    });

    if (error) return { success: false, error: error.message };

    return { success: true };
  } catch (error) {
    console.error("Error during signup:", error);
    return { success: false, error: "Server error" };
  }
}
