import { cn } from "@/shared/lib/cn";
import React from "react";
import { Category } from "../types/recurringPaymentForm";

type PaymentCategoryProps = {
  category: Category;
};

const PaymentCategory = ({ category }: PaymentCategoryProps) => {
  return (
    <span
      className={cn(
        "font-medium px-2.5 py-1 rounded-md w-fit absolute top-0 right-0",
        category === "Bills" && "bg-green-100 text-green-800",
        category === "Subscriptions" && "bg-purple-100 text-purple-800",
        category === "Rent" && "bg-yellow-100 text-yellow-800",
        category === "Salary" && "bg-teal-100 text-teal-800",
        category === "Entertainment" && "bg-blue-100 text-blue-800",
        category === "Other" && "bg-gray-100 text-gray-800",
      )}
    >
      {category}
    </span>
  );
};

export default PaymentCategory;
