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
