"use client";

import Button from "@/shared/components/ui/Button";
import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
import React from "react";

const AddPaymentForm: React.FC = () => {
  return (
    <Form layout="vertical">
      <Input id="name" type="text" label="Payment Name" layout="horizontal" />
      {/* <label htmlFor="">Repeat</label>
      <select>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
        <option value="weekly">Weekly</option>
        <option value="daily">Daily</option>
      </select> */}
      <Input
        id="repeat"
        type="select"
        label="Repeat"
        layout="horizontal"
        selectOptions={["Monthly", "Yearly", "Weekly", "Daily"]}
      />
      <Input id="amount" type="number" label="Amount" layout="horizontal" />
      <div>
        <Button variant="secondary" size="medium" text="Cancel" />
        <Button variant="primary" size="medium" text="Add Payment" />
      </div>
    </Form>
  );
};

export default AddPaymentForm;
