"use client";

import React, { startTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
//Components
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import SelectInput from "@/shared/components/ui/SelectInput";
import DateInput from "@/shared/components/ui/DateInput";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
//Actions
import { editRecurringPayment } from "@/features/recurring-payments/lib/actions/editRecurringPayment";
//Styles
import { toastStyle } from "@/shared/styles/toastStyle";
//Types
import { RecurringPayment } from "@/features/recurring-payments/types/recurring-payment";
import { repeatOptions, typeOptions } from "../types/recurringPaymentForm";
//Schemas
import { recurringPaymentSchema } from "../schemas/recurringPaymentSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import z from "zod";
import { FolderPen, Wallet } from "lucide-react";

interface EditPaymentFormProps {
  payment: RecurringPayment;
}

const EditPaymentForm: React.FC<EditPaymentFormProps> = ({ payment }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof recurringPaymentSchema>>({
    resolver: zodResolver(recurringPaymentSchema),
    defaultValues: {
      name: payment.name,
      repeat: payment.repeat as "Monthly" | "Weekly",
      type: payment.type as "Income" | "Expense",
      amount: payment.amount,
      next_payment_date: payment.next_payment_date,
    },
    mode: "onChange",
  });

  function onSubmit(data: z.infer<typeof recurringPaymentSchema>) {
    console.log("Submitting data:", data);
    startTransition(async () => {
      const result = await editRecurringPayment(data, payment.id);

      if (result.success) {
        toast.success("Payment added!", toastStyle);
        router.push("/recurring-payments");
        router.refresh();
      } else {
        toast.error(result.error || "Something went wrong", toastStyle);
        // If server returns specific field errors, you can map them here:
        // form.setError("name", { message: "This name is already taken" });
      }
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-md">
      <FieldGroup>
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-3">
              <Input
                {...field}
                id="name"
                type="text"
                label="Payment Name"
                icon={<FolderPen />}
                placeholder="Payment"
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </div>
          )}
        />
        <Field
          orientation="horizontal"
          className="flex justify-between gap-4 items-start"
        >
          <Controller
            control={form.control}
            name="amount"
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-3 flex-1">
                <Input
                  {...form.register("amount", { valueAsNumber: true })}
                  {...field}
                  type="number"
                  id="amount"
                  label="Amount"
                  icon={<Wallet />}
                  placeholder="0.00"
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ""
                        ? undefined
                        : Number(e.target.value),
                    )
                  }
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </div>
            )}
          />
          <Controller
            control={form.control}
            name="next_payment_date"
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-3 flex-1">
                <DateInput
                  {...field}
                  id="next_payment_date"
                  label="Next Payment Date"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </div>
            )}
          />
        </Field>
        <Field orientation="horizontal">
          <div className="flex justify-between w-full gap-4 items-start">
            <Controller
              control={form.control}
              name="repeat"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-3 flex-1">
                  <SelectInput
                    {...field}
                    id="repeat"
                    label="Repeat"
                    selectOptions={repeatOptions}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </div>
              )}
            />
            <Controller
              control={form.control}
              name="type"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-3 flex-1">
                  <SelectInput
                    {...field}
                    id="type"
                    label="Type"
                    selectOptions={typeOptions}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </div>
              )}
            />
          </div>
        </Field>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={() => router.push("/recurring-payments")}
          >
            Cancel
          </Button>
          <Button variant="default" size="sm" type="submit">
            Add Payment
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default EditPaymentForm;
