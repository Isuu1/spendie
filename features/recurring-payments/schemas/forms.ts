import z from "zod";

export const recurringPaymentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  repeat: z.enum(["Monthly", "Yearly", "Weekly", "Daily", ""], {
    message: "Invalid repeat value",
  }),
  amount: z
    .number({ invalid_type_error: "Please provide amount" })
    .min(0.01, "Amount must be greater than 0"),
  type: z.enum(["Income", "Expense", ""], {
    message: "Invalid type value",
  }),
  first_payment_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});
