"use server";

import { createClient } from "@/supabase/server";
import { SignupFormState } from "../../types/forms";

export async function signup(prevState: SignupFormState, formData: FormData) {
  const supabase = await createClient();

  //Form data from frontend form
  const data = {
    email: formData.get("email") as string,
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  // const validateSignupData = signupSchema.safeParse(data);

  // //Return data along with error message to to able to set email as default value (prevent clearing the input)
  // if (!validateSignupData.success) {
  //   return {
  //     error: validateSignupData.error.format(),
  //     success: false,
  //     data,
  //     status: 400,
  //     resetKey: Date.now(),
  //   };
  // }

  //Return data along with error message to to able to set email as default value (prevent clearing the input)
  if (data.password !== data.confirmPassword) {
    return {
      error: "Passwords do not match",
      success: false,
      data,
      status: 400,
      resetKey: Date.now(),
    };
  }

  // Include all initial user data in metadata to insert them into database
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        email: data.email,
        username: data.username,
        avatar: "",
      },
    },
  });

  if (error) {
    return {
      error: error.message,
      success: false,
      data,
      status: 400,
      resetKey: Date.now(),
    };
  }

  //Upon successful registration, return success message
  return {
    error: null,
    success: true,
    data,
    status: 200,
    resetKey: Date.now(),
  };
}
