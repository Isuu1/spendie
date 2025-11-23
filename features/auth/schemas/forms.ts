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

    password: z
      .string()
      .min(1, "Password is required") // <-- PRIORITY CHECK FOR EMPTINESS
      .superRefine((val, ctx) => {
        // If the value is empty, the min(1) check above already ran,
        // and we simply stop validation here.
        if (val.length === 0) {
          return;
        }

        // --- ALL COMPLEX CHECKS NOW RUN ONLY IF PASSWORD IS NOT EMPTY ---
        if (val.length < 8) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password must be at least 8 characters",
          });
        }
        if (!/[A-Z]/.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password must contain at least one uppercase letter",
          });
        }
        if (!/[a-z]/.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password must contain at least one lowercase letter",
          });
        }
        if (!/\d/.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password must contain at least one number",
          });
        }
        if (!/[^A-Za-z0-9]/.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password must contain at least one special character",
          });
        }
      }),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  //Compare password and confirm password fields and attach error to confirmPassword field
  //Server side validation is also done in signup action
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
