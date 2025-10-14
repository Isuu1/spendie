import z from "zod";

//Validate the form data
export const recurringPaymentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  repeat: z.enum(["Monthly", "Yearly", "Weekly", "Daily", ""], {
    message: "Invalid repeat value",
  }),
  amount: z.number().min(1, "Amount must be a positive number"),
  type: z.enum(["Income", "Expense", ""], {
    message: "Invalid type value",
  }),
  // add_payment_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
  //   message: "Invalid date format",
  // }),
  first_payment_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});
