import z from "zod";
import { repeatOptions, typeOptions } from "../types/forms";

export const recurringPaymentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  repeat: z.enum(repeatOptions, {
    message: "Invalid repeat value",
  }),
  amount: z
    .number({ invalid_type_error: "Please provide amount" })
    .min(0.01, "Amount must be greater than 0"),
  type: z.enum(typeOptions, {
    message: "Invalid type value",
  }),
  first_payment_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});
