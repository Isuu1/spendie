"use client";

import Button from "@/shared/components/ui/Button";
import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
import React from "react";

//Styles
import styles from "./AddPaymentForm.module.scss";
import { useRouter } from "next/navigation";

const AddPaymentForm: React.FC = () => {
  const router = useRouter();

  return (
    <Form layout="vertical">
      <Input id="name" type="text" label="Payment Name" layout="horizontal" />
      <Input
        id="repeat"
        type="select"
        label="Repeat"
        layout="horizontal"
        selectOptions={["Monthly", "Yearly", "Weekly", "Daily"]}
      />
      <Input id="amount" type="number" label="Amount" layout="horizontal" />
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
        />
      </div>
    </Form>
  );
};

export default AddPaymentForm;
