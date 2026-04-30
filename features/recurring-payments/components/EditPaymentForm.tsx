"use client";

import React, { startTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
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
import { RecurringPayment } from "@/features/recurring-payments/types/recurringPayment";
import { repeatOptions, typeOptions } from "../types/recurringPaymentForm";
//Schemas
import { recurringPaymentSchema } from "../schemas/recurringPaymentSchema";
//Icons
import { FolderPen, Wallet } from "lucide-react";

interface EditPaymentFormProps {
  payment: RecurringPayment;
}

const EditPaymentForm: React.FC<EditPaymentFormProps> = ({ payment }) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  console.log("Editing payment:", payment);

  const form = useForm<z.infer<typeof recurringPaymentSchema>>({
    resolver: zodResolver(recurringPaymentSchema),
    defaultValues: {
      name: payment.name,
      repeat: payment.repeat as "Monthly" | "Weekly",
      type: payment.type as "Income" | "Expense",
      amount: payment.amount,
      next_payment_date: dayjs(payment.next_payment_date).toDate(),
    },
    mode: "onChange",
  });

  function onSubmit(data: z.infer<typeof recurringPaymentSchema>) {
    console.log("Submitting data:", data);
    startTransition(async () => {
      const result = await editRecurringPayment(data, payment.id);

      if (result.success) {
        toast.success("Payment updated!", toastStyle);
        await queryClient.invalidateQueries({
          queryKey: ["recurringPayments"],
        });
        router.push("/recurring-payments");
      } else {
        toast.error(result.error || "Something went wrong", toastStyle);
      }
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-md">
      <FieldGroup>
        <div className="flex flex-col gap-3">
          <Input
            {...form.register("name")}
            id="name"
            type="text"
            label="Payment Name"
            icon={<FolderPen />}
            placeholder="Payment"
          />
          {form.formState.errors.name && (
            <FieldError errors={[form.formState.errors.name]} />
          )}
        </div>

        <Field
          orientation="horizontal"
          className="flex justify-between gap-4 items-start"
        >
          <div className="flex flex-col gap-3 flex-1">
            <Input
              {...form.register("amount", { valueAsNumber: true })}
              type="number"
              id="amount"
              label="Amount"
              icon={<Wallet />}
              placeholder="0.00"
            />
            {form.formState.errors.amount && (
              <FieldError errors={[form.formState.errors.amount]} />
            )}
          </div>

          <Controller
            control={form.control}
            name="next_payment_date"
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-3 flex-1">
                <DateInput
                  {...field}
                  id="next_payment_date"
                  label="Next Payment Date"
                  disabled={{ before: dayjs().startOf("day").toDate() }}
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
            Update Payment
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default EditPaymentForm;
