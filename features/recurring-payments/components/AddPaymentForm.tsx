"use client";

import React, { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
//Components
import Button from "@/shared/components/ui/Button";
import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
//Styles
import styles from "./AddPaymentForm.module.scss";
//Actions
import { addRecurringPayment } from "@/features/recurring-payments/lib/actions/add-recurring-payment";
//Types
import { AddPaymentFormState } from "@/features/recurring-payments/types/forms";

const initialState: AddPaymentFormState = {
  data: {
    id: "",
    name: "",
    repeat: "",
    type: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0], // Default to today's date
  },
  success: false,
  message: "",
  error: null,
};

const AddPaymentForm: React.FC = () => {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    addRecurringPayment,
    initialState
  );

  const [errors, setErrors] = useState<
    Record<string, { errors: string[] } | null>
  >({});

  const handleInputChange = (id: string) => {
    setErrors((prev) => ({ ...prev, [id]: null }));
  };

  useEffect(() => {
    if (state.success) {
      router.push("/recurring-payments");
    }
  }, [state.success, router]);

  useEffect(() => {
    if (state.error) {
      setErrors(state.error);
      console.log("Error state:", state.error);
    }
  }, [state.error]);

  console.log("Errors:", errors);
  console.log("State data:", state.data);

  return (
    <Form layout="vertical" action={formAction}>
      <Input
        id="name"
        type="text"
        label="Payment Name"
        layout="horizontal"
        errors={errors.name?.errors}
        onChange={() => handleInputChange("name")}
        defaultValue={state.data.name}
      />
      <Input
        id="repeat"
        type="select"
        label="Repeat"
        layout="horizontal"
        selectOptions={["Monthly", "Yearly", "Weekly", "Daily"]}
      />
      <Input
        id="type"
        type="select"
        label="Type"
        layout="horizontal"
        selectOptions={["Income", "Expense"]}
      />
      <Input
        id="amount"
        type="number"
        label="Amount"
        layout="horizontal"
        errors={errors.amount?.errors}
        onChange={() => handleInputChange("amount")}
      />
      <Input
        id="date"
        type="date"
        label="Date"
        layout="horizontal"
        errors={errors.date?.errors}
        onChange={() => handleInputChange("date")}
      />
      <div className={styles.buttons}>
        <Button
          variant="secondary"
          size="medium"
          type="button"
          text="Cancel"
          onClick={() => router.back()}
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
