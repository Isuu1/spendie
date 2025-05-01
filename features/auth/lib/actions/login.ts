"use server";

import { createClient } from "@/supabase/server";
import { LoginFormState } from "../../types/forms";
import { revalidatePath } from "next/cache";

export async function login(prevData: LoginFormState, formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  if (!data.email || !data.password) {
    return {
      error: "Email and password are required",
      success: false,
      data,
      status: 400,
      resetKey: Date.now(),
    };
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  //resetKey is crucial to trigger useEffect in form component even if the error is the same
  if (error) {
    return {
      error: error.message,
      success: false,
      data,
      status: 400,
      resetKey: Date.now(),
    };
  }

  revalidatePath("/", "layout");
  return {
    error: null,
    success: true,
    data,
    status: 200,
    resetKey: Date.now(),
  };
}
