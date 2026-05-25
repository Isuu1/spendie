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
import { Field, FieldGroup } from "@/components/ui/field";
import InputError from "@/shared/components/ui/InputError";
//Actions
import { editRecurringPayment } from "@/features/recurring-payments/lib/actions/editRecurringPayment";
//Styles
import { toastStyle } from "@/shared/styles/toastStyle";
//Types
import { RecurringPayment } from "@/features/recurring-payments/types/recurringPayment";
import {
  categoryOptions,
  repeatOptions,
  typeOptions,
} from "../types/recurringPaymentForm";
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

  const form = useForm<z.infer<typeof recurringPaymentSchema>>({
    resolver: zodResolver(recurringPaymentSchema),
    defaultValues: {
      name: payment.name,
      category: payment.category,
      repeat: payment.repeat,
      type: payment.type,
      amount: payment.amount,
      next_payment_date: dayjs(payment.next_payment_date).toDate(),
    },
    mode: "onChange",
  });

  function onSubmit(data: z.infer<typeof recurringPaymentSchema>) {
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
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-md bg-card p-6 rounded-2xl"
    >
      <FieldGroup>
        <h3>Edit recurring payment</h3>
        <Field orientation="horizontal">
          <div className="flex flex-col gap-3 flex-1">
            <Input
              {...form.register("name")}
              id="name"
              type="text"
              label="Payment Name"
              icon={<FolderPen />}
              placeholder="Payment"
              error={form.formState.errors.name}
            />
            <InputError error={form.formState.errors.name} />
          </div>
          <Controller
            control={form.control}
            name="category"
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-3 flex-1">
                <SelectInput
                  {...field}
                  id="category"
                  label="Category"
                  selectOptions={categoryOptions}
                  error={fieldState.error}
                />
                <InputError error={form.formState.errors.category} />
              </div>
            )}
          />
        </Field>
        <Field
          orientation="horizontal"
          className="flex justify-between gap-4 items-start"
        >
          <div className="flex flex-col gap-3 flex-1">
            <Input
              {...form.register("amount")}
              type="number"
              id="amount"
              label="Amount"
              icon={<Wallet />}
              placeholder="0.00"
              error={form.formState.errors.amount}
            />
            <InputError error={form.formState.errors.amount} />
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
                  error={fieldState.error}
                />
                <InputError error={fieldState.error} />
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
                    error={fieldState.error}
                  />
                  <InputError error={fieldState.error} />
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
                    error={fieldState.error}
                  />
                  <InputError error={fieldState.error} />
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
