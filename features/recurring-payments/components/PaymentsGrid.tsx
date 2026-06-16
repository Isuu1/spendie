"use client";
import React, { useState } from "react";
//Components
import SelectInput from "@/shared/components/ui/SelectInput";
import ErrorMessage from "@/shared/components/ErrorMessage";
import PaymentItem from "./PaymentItem";
import AddPaymentDrawer from "./AddPaymentDrawer";
//Hooks
import { useRecurringPayments } from "../hooks/useRecurringPayments";
import { useSorting } from "@/shared/hooks/useSorting";
//Config
import { sortingOptions } from "../config/sortingOptions";
import { paymentTemplates } from "../config/paymentTemplates";
//Icons
import { CreditCard, IdCard } from "lucide-react";
import Button from "@/shared/components/ui/Button";
import { AnimatePresence, motion } from "motion/react";

//Extraact only label and value for SelectInput
const selectOptions = sortingOptions.map(({ label, value }) => ({
  label,
  value,
}));

const PaymentsGrid = () => {
  const { data = [], error } = useRecurringPayments();

  const [showTemplates, setShowTemplates] = useState(false);

  const { sortedItems, sortOption, handleSortingChange } = useSorting(
    data,
    sortingOptions,
    "Date",
  );

  const hasPayments = data.length > 0;

  if (error)
    return <ErrorMessage message="Failed to load recurring payments." />;

  return (
    <div className="grow flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mt-4">
          <AddPaymentDrawer />
          <Button
            onClick={() => setShowTemplates(!showTemplates)}
            variant="secondary"
            className="bg-background"
            icon={<IdCard />}
            iconPosition="left"
          >
            {showTemplates ? "Hide templates" : "Add from template"}
          </Button>
        </div>
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

      <AnimatePresence>
        {showTemplates && (
          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <p>Templates</p>
            <div className="flex gap-2 flex-wrap">
              {paymentTemplates.map((template) => (
                <AddPaymentDrawer
                  key={template.name}
                  defaultValues={template}
                  triggerName={template.name}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex gap-4 flex-wrap">
        {sortedItems.map((payment) => {
          return <PaymentItem key={payment.id} payment={payment} />;
        })}
      </div>
      {!hasPayments && (
        <div className="self-center flex flex-col items-center gap-4 text-center">
          <h3 className="flex items-center gap-2">
            <CreditCard />
            Track your recurring payments
          </h3>
          <p>
            Add subscriptions, bills, salaries, and other repeating payments to
            automatically monitor future income and expenses.
          </p>
          <AddPaymentDrawer />
          <h3>Popular</h3>
          <div className="flex gap-2">
            {paymentTemplates.map((template) => (
              <AddPaymentDrawer
                key={template.name}
                defaultValues={template}
                triggerName={template.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsGrid;
