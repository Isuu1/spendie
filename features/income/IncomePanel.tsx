import React, { useState } from "react";
import { useTransactions } from "../transactions/hooks/useTransactions";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
//import Button from "@/shared/components/ui/Button";
import IncomeChart from "./IncomeChart";
import SelectInput from "@/shared/components/ui/SelectInput";

type periodOptions = "last3Months" | "last6Months";

const IncomePanel = () => {
  const { data: transactions } = useTransactions();

  const [selectedPeriod, setSelectedPeriod] =
    useState<periodOptions>("last3Months");

  const selectOptions = [
    { value: "last3Months", label: "Last 3 Months" },
    { value: "last6Months", label: "Last 6 Months" },
  ];

  return (
    <div className="grid grid-cols-[3fr_1fr] items-center gap-4">
      <h4 className="text-secondary">Income</h4>
      <SelectInput
        id="income-period-select"
        selectOptions={selectOptions}
        value={selectedPeriod}
        onChange={(value) => setSelectedPeriod(value as periodOptions)}
      />
      {/* <Popover>
        <PopoverTrigger asChild>
          <Button
            size="default"
            variant="secondary"
            className="bg-background font-normal aria-expanded:bg-background"
          >
            {selectedPeriod === "last3Months"
              ? "Last 3 Months"
              : "Last 6 Months"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-background w-auto p-1 gap-1">
          <Button
            className="bg-transparent hover:bg-card text-primary font-normal"
            size="default"
            onClick={() => setSelectedPeriod("last3Months")}
          >
            Last 3 Months
          </Button>
          <Button
            className="bg-transparent hover:bg-card text-primary font-normal"
            size="default"
            onClick={() => setSelectedPeriod("last6Months")}
          >
            Last 6 Months
          </Button>
        </PopoverContent>
      </Popover> */}
      <IncomeChart
        transactions={transactions}
        selectedPeriod={selectedPeriod}
      />
    </div>
  );
};

export default IncomePanel;
