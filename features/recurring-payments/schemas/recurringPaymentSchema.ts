import z from "zod";
import { repeatOptions, typeOptions } from "../types/recurringPaymentForm";

export const recurringPaymentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  repeat: z.enum(
    repeatOptions.map((opt) => opt.value) as [string, ...string[]],
  ),
  amount: z.coerce.number().min(0.01),
  type: z.enum(typeOptions.map((opt) => opt.value) as [string, ...string[]]),
  next_payment_date: z.date({
    invalid_type_error: "Please provide a valid date",
  }),
  account_id: z.coerce
    .number({
      required_error: "Please select an account",
      invalid_type_error: "Account ID must be a number",
    })
    .optional()
    .nullable(),
});
