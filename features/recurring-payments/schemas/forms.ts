import z from "zod";
import { repeatOptions, typeOptions } from "../types/forms";

export const recurringPaymentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  repeat: z.enum(repeatOptions.map(opt => opt.value) as [string, ...string[]], { 
    message: "Invalid repeat value",
  }),
  amount: z
    .number({ invalid_type_error: "Please provide amount" })
    .min(1, "Amount must be greater than 0"),
  type: z.enum(typeOptions.map(opt => opt.value) as [string, ...string[]], {
    message: "Invalid type value",
  }),
  next_payment_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});
