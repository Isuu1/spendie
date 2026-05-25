"use client";
import React from "react";
import Link from "next/link";
//Icons
import { IdCard } from "lucide-react";
//Components
import SelectInput from "@/shared/components/ui/SelectInput";
import ErrorMessage from "@/shared/components/ErrorMessage";
import PaymentItem from "./PaymentItem";
import Button from "@/shared/components/ui/Button";
//Hooks
import { useRecurringPayments } from "../hooks/useRecurringPayments";
import { useSorting } from "@/shared/hooks/useSorting";
//Config
import { sortingOptions } from "../config/sortingOptions";

//Extraact only label and value for SelectInput
const selectOptions = sortingOptions.map(({ label, value }) => ({
  label,
  value,
}));

const RecurringPaymentsGrid: React.FC = () => {
  const { data = [], error } = useRecurringPayments();

  const { sortedItems, sortOption, handleSortingChange } = useSorting(
    data,
    sortingOptions,
    "Date",
  );

  //const hasPayments = data.length > 0

  if (error)
    return (
      <ErrorMessage
        variant="panel"
        message="Failed to load recurring payments."
      />
    );

  return (
    <div className="grow flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link href="/recurring-payments/add-payment">
          <Button icon={<IdCard />} iconPosition="left" variant="secondary">
            Add payment
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap">Sort by</span>
          <SelectInput
            id="sort"
            selectOptions={selectOptions}
            value={sortOption.value}
            onChange={(option) => handleSortingChange(option)}
          />
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        {sortedItems.map((payment) => {
          return <PaymentItem key={payment.id} payment={payment} />;
        })}
      </div>
    </div>

    //   {!hasPayments && !error && (
    //     <p className={styles.noPayments}>No recurring payments found.</p>
    //   )}
    // </div>
  );
};

export default RecurringPaymentsGrid;
