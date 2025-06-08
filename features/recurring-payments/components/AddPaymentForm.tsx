"use client";

import Button from "@/shared/components/ui/Button";
import React from "react";

const AddPaymentForm: React.FC = () => {
  return (
    <form>
      <label>Name</label>
      <input type="text" />
      <label htmlFor="">Repeat</label>
      <select>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
        <option value="weekly">Weekly</option>
        <option value="daily">Daily</option>
      </select>
      <label>Amount</label>
      <input type="number" />
      <div>
        <Button variant="secondary" size="medium" text="Cancel" />
        <Button variant="primary" size="medium" text="Add Payment" />
      </div>
    </form>
  );
};

export default AddPaymentForm;
