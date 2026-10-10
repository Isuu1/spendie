"use client";

import React, { startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";
//Components
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import SelectInput from "@/shared/components/ui/SelectInput";
import DateInput from "@/shared/components/ui/DateInput";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import InputError from "@/shared/components/ui/InputError";
//Actions
import { addRecurringPayment } from "@/features/recurring-payments/lib/actions/addRecurringPayment";
//Types
import {
  categoryOptions,
  getAccountOptions,
  RecurringPaymentFormValues,
  repeatOptions,
  typeOptions,
} from "@/features/recurring-payments/types/recurringPaymentForm";
import { Institution } from "@/features/accounts/types/institution";
//Styles
import { toastStyle } from "@/shared/styles/toastStyle";
//Schemas
import { recurringPaymentSchema } from "@/features/recurring-payments/schemas/recurringPaymentSchema";
//Icons
import { FolderPen, Wallet } from "lucide-react";
import { getUserClient } from "@/features/user/api/getUserClient";
import PlaidLink from "@/shared/components/PlaidLink/PlaidLink";
import { UserProfile } from "@/features/user/types/user";

type AddPaymentFormProps = {
  onCancel: () => void;
  defaultValues?: Partial<RecurringPaymentFormValues>;
  institutions: Institution[];
};

const AddPaymentForm = ({
  onCancel,
  defaultValues,
  institutions,
}: AddPaymentFormProps) => {
  const [user, setUser] = React.useState<UserProfile | null>(null);

  const router = useRouter();

  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserClient();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const form = useForm<RecurringPaymentFormValues>({
    resolver: zodResolver(recurringPaymentSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      repeat: repeatOptions[0].value,
      type: defaultValues?.type || typeOptions[0].value,
      category: defaultValues?.category || categoryOptions[0].value,
      amount: undefined,
      next_payment_date: undefined,
      account_type:
        defaultValues?.account_type ||
        getAccountOptions(institutions)[0]?.value ||
        "",
    },
    mode: "onChange",
  });

  function onSubmit(data: RecurringPaymentFormValues) {
    startTransition(async () => {
      const result = await addRecurringPayment(data);

      if (result.success) {
        toast.success("Payment added!", toastStyle);
        await queryClient.invalidateQueries({
          queryKey: ["recurringPayments"],
        });
        onCancel();
        router.refresh();
      } else {
        toast.error(result.error || "Something went wrong", toastStyle);
      }
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-md bg-card p-6 rounded-2xl max-sm:w-full"
    >
      <FieldGroup>
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
        <FieldSet>
          <div className="flex items-center justify-between">
            <FieldLegend>Bank account</FieldLegend>
            <span className="text-xs text-primary bg-card-foreground py-1 px-2 rounded-lg">
              Optional
            </span>
          </div>

          <FieldDescription>
            Choose the account this payment comes from to automatically detect
            when it`s paid.
          </FieldDescription>

          <Controller
            control={form.control}
            name="account_type"
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-2">
                <SelectInput
                  {...field}
                  id="account_type"
                  selectOptions={getAccountOptions(institutions)}
                  placeholder={
                    institutions.length === 0
                      ? "No accounts found"
                      : "Select an account"
                  }
                  error={fieldState.error}
                />

                <InputError error={fieldState.error} />
              </div>
            )}
          />
          {institutions.length === 0 && user && <PlaidLink userId={user?.id} />}

          <p className="text-sm text-muted-foreground">
            Without an account, you can still track this payment manually.
          </p>
        </FieldSet>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={onCancel}
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

export default AddPaymentForm;
