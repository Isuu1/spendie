import z from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .refine((val) => val === "" || z.string().email().safeParse(val).success, {
      message: "Invalid email address",
    }),
  password: z.string().min(1, "Password is required"),
});

export const signupFormSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .refine(
        (val) => val === "" || z.string().email().safeParse(val).success,
        {
          message: "Invalid email address",
        }
      ),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  //Compare password and confirm password fields and attach error to confirmPassword field
  //Server side validation is also done in signup action
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
