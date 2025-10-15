"use client";

import React, { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
//Components
import Button from "@/shared/components/ui/Button";
import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
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

  const { formData, errors, handleChange, validate } = useForm(
    recurringPaymentSchema,
    {
      name: "",
      repeat: "",
      type: "",
      amount: 0,
      first_payment_date: "",
    }
  );

  const handleValidationBeforeSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    const isValid = validate(formData);
    if (!isValid) {
      e.preventDefault(); // Stop form submission if invalid
      toast.error("Please fix the errors before submitting.", toastStyle);
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
      <Input
        id="repeat"
        type="select"
        label="Repeat"
        layout="horizontal"
        selectOptions={["Monthly", "Yearly", "Weekly", "Daily"]}
        value={formData.repeat}
        onChange={(e) => handleChange("repeat", e.target.value)}
      />
      <Input
        id="type"
        type="select"
        label="Type"
        layout="horizontal"
        selectOptions={["Income", "Expense"]}
        value={formData.type}
        onChange={(e) => handleChange("type", e.target.value)}
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
      <Input
        id="first_payment_date"
        type="date"
        label="First Payment Date"
        layout="horizontal"
        errors={errors.first_payment_date}
        value={formData.first_payment_date}
        onChange={(e) => handleChange("first_payment_date", e.target.value)}
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
