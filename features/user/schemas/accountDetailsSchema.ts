import z from "zod";

export const accountDetailsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  surname: z.string().min(2, "Surname must be at least 2 characters long"),
  dob: z.date({
    invalid_type_error: "Please provide a valid date",
  }),
  email: z.string().email(),
});
