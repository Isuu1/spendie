"use client";

import React, { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
//Components
import Button from "@/shared/components/ui/Button";
import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
//Actions
import { addRecurringPayment } from "@/features/recurring-payments/lib/actions/add-recurring-payment";
//Types
import { AddPaymentFormState } from "@/features/recurring-payments/types/forms";
//Styles
import { toastStyle } from "@/shared/styles/toastStyle";
import { RecurringPayment } from "@/shared/types/recurring-payment";

const initialState: AddPaymentFormState = {
  data: {
    name: "",
    repeat: "",
    type: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0], //Today's date
  },
  success: false,
  message: "",
  error: null,
};

interface EditPaymentFormProps {
  payment: RecurringPayment;
}

const EditPaymentForm: React.FC<EditPaymentFormProps> = ({ payment }) => {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    addRecurringPayment,
    initialState
  );

  const [errors, setErrors] = useState<
    Record<string, { errors: string[] } | null>
  >({});

  //Remove input error when user starts typing
  const handleInputChange = (id: string) => {
    setErrors((prev) => ({ ...prev, [id]: null }));
  };

  useEffect(() => {
    if (state.success) {
      toast.success("Payment updated successfully!", toastStyle);
      router.push("/recurring-payments");
    }
  }, [state.success, router]);

  useEffect(() => {
    if (state.error) {
      setErrors(state.error);
    }
    if (state.error?.general) {
      toast.error(state.error.general.errors[0], toastStyle);
    }
  }, [state.error]);

  return (
    <Form layout="vertical" action={formAction}>
      <Input
        id="name"
        type="text"
        label="Payment Name"
        layout="horizontal"
        errors={errors.name?.errors}
        onChange={() => handleInputChange("name")}
        defaultValue={payment.name}
      />
      <Input
        id="repeat"
        type="select"
        label="Repeat"
        layout="horizontal"
        selectOptions={["Monthly", "Yearly", "Weekly", "Daily"]}
        defaultValue={payment.repeat}
      />
      <Input
        id="type"
        type="select"
        label="Type"
        layout="horizontal"
        selectOptions={["Income", "Expense"]}
        defaultValue={payment.type}
      />
      <Input
        id="amount"
        type="number"
        label="Amount"
        layout="horizontal"
        errors={errors.amount?.errors}
        onChange={() => handleInputChange("amount")}
        defaultValue={payment.amount}
      />
      <Input
        id="date"
        type="date"
        label="Date"
        layout="horizontal"
        errors={errors.date?.errors}
        onChange={() => handleInputChange("date")}
        defaultValue={payment.date}
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
