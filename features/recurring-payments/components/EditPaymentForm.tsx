"use client";

import React, { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
//Components
import Button from "@/shared/components/ui/Button";
import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
//Actions
import { editRecurringPayment } from "@/features/recurring-payments/lib/actions/editRecurringPayment";
//Styles
import { toastStyle } from "@/shared/styles/toastStyle";
import { RecurringPayment } from "@/features/recurring-payments/types/recurring-payment";
import {
  initialRecurringPaymentFormState,
  repeatOptions,
  typeOptions,
} from "../types/forms";
import { recurringPaymentSchema } from "../schemas/forms";
import { useForm } from "@/shared/hooks/useForm";

interface EditPaymentFormProps {
  payment: RecurringPayment;
}

const EditPaymentForm: React.FC<EditPaymentFormProps> = ({ payment }) => {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    //Attach payment ID to the action
    editRecurringPayment.bind(null, payment.id),
    initialRecurringPaymentFormState
  );

  console.log("payment to edit", payment);

  const { formData, errors, handleChange, validateForm } = useForm(
    recurringPaymentSchema,
    {
      name: payment.name,
      repeat: payment.repeat as "" | "Monthly" | "Yearly" | "Weekly" | "Daily",
      type: payment.type as "" | "Income" | "Expense",
      amount: payment.amount,
      first_payment_date: payment.first_payment_date,
    }
  );

  const handleValidationBeforeSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    //This runs before server action to validate all fields on client side
    const isValid = validateForm(formData);
    if (!isValid) {
      //Stop form submission if invalid
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (state.success) {
      toast.success("Recurring payment edited successfully!", toastStyle);
      router.push("/recurring-payments");
    }
    if (state.error) {
      toast.error(`Error: ${state.error}`, toastStyle);
    }
  }, [state, router]);

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
        selectOptions={repeatOptions}
        value={formData.repeat}
        onChange={(e) => handleChange("repeat", e.target.value)}
      />
      <Input
        id="type"
        type="select"
        label="Type"
        layout="horizontal"
        selectOptions={typeOptions}
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
          text="Save"
          disabled={isPending}
        />
      </div>
    </Form>
  );
};

export default EditPaymentForm;
