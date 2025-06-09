"use client";

import Button from "@/shared/components/ui/Button";
import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
import React, { useActionState } from "react";

//Styles
import styles from "./AddPaymentForm.module.scss";
import { useRouter } from "next/navigation";
import { addRecurringPayment } from "../lib/actions/add-recurring-payment";
import { AddPaymentFormState } from "@/features/recurring-payments/types/forms";

const initialState: AddPaymentFormState = {
  success: false,
  message: "",
};

const AddPaymentForm: React.FC = () => {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    addRecurringPayment,
    initialState
  );

  if (state.success) {
    router.push("/recurring-payments");
  }

  console.log("Form state:", state);
  console.log("Is pending:", isPending);

  return (
    <Form layout="vertical" action={formAction}>
      <Input id="name" type="text" label="Payment Name" layout="horizontal" />
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
      <Input id="amount" type="number" label="Amount" layout="horizontal" />
      <Input id="date" type="date" label="Date" layout="horizontal" />
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
