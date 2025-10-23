"use client";

import React, { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
//Components
import Button from "@/shared/components/ui/Button";
import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
import SelectInput from "@/shared/components/ui/SelectInput";
import DateInput from "@/shared/components/ui/DateInput";
//Actions
import { addRecurringPayment } from "@/features/recurring-payments/lib/actions/addRecurringPayment";
//Types
import { initialRecurringPaymentFormState } from "@/features/recurring-payments/types/forms";
//Styles
import { toastStyle } from "@/shared/styles/toastStyle";
import { useForm } from "@/shared/hooks/useForm";
//Schemas
import { recurringPaymentSchema } from "@/features/recurring-payments/schemas/forms";

const AddPaymentForm: React.FC = () => {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    addRecurringPayment,
    initialRecurringPaymentFormState
  );

  const { formData, errors, handleChange, validateForm } = useForm(
    recurringPaymentSchema,
    {
      name: "",
      repeat: "Monthly",
      type: "Income",
      amount: 0,
      first_payment_date: "",
    }
  );

  const handleValidationBeforeSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    //This runs before server action to validate all fields on client side
    const isValid = validateForm(formData);
    console.log("data before submit", formData, isValid);
    if (!isValid) {
      //Stop form submission if invalid
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (state.success) {
      toast.success("Recurring payment added successfully!", toastStyle);
      router.push("/recurring-payments");
    }
    if (state.error) {
      toast.error(`Error: ${state.error}`, toastStyle);
    }
  }, [state, router]);

  console.log("form state", state);
  console.log("errors", errors);

  return (
    <Form
      layout="vertical"
      action={formAction}
      onSubmit={handleValidationBeforeSubmit}
    >
      <Input
        id="name"
        type="text"
        label="Payment Name"
        layout="horizontal"
        errors={errors.name}
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <SelectInput
        id="repeat"
        label="Repeat"
        layout="horizontal"
        selectOptions={["Monthly", "Weekly"]}
        value={formData.repeat}
        onChange={(val) => handleChange("repeat", val)}
      />
      <SelectInput
        id="type"
        label="Type"
        layout="horizontal"
        selectOptions={["Income", "Expense"]}
        value={formData.type}
        onChange={(val) => handleChange("type", val)}
      />
      <Input
        id="amount"
        type="number"
        label="Amount"
        layout="horizontal"
        errors={errors.amount}
        value={formData.amount}
        onChange={(e) => handleChange("amount", e.target.value)}
      />
      <DateInput
        id="first_payment_date"
        label="First Payment Date"
        layout="horizontal"
        errors={errors.first_payment_date}
        value={formData.first_payment_date}
        onChange={(val) => handleChange("first_payment_date", val)}
      />

      <div className="flex-row-space-between">
        <Button
          variant="secondary"
          size="medium"
          type="button"
          text="Cancel"
          onClick={() => router.push("/recurring-payments")}
        />
        <Button
          variant="primary"
          size="medium"
          type="submit"
          text="Add Payment"
          disabled={isPending}
        />
      </div>
    </Form>
  );
};

export default AddPaymentForm;
