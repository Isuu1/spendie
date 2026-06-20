import React, { useState } from "react";
import { useTransactions } from "../transactions/hooks/useTransactions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Button from "@/shared/components/ui/Button";
import IncomeChart from "./IncomeChart";
//import SelectInput from "@/shared/components/ui/SelectInput";

type periodOptions = "last3Months" | "last6Months";

const IncomePanel = () => {
  const { data: transactions } = useTransactions();

  const [selectedPeriod, setSelectedPeriod] =
    useState<periodOptions>("last3Months");

  const [open, setOpen] = useState(false);

  //   const selectOptions = [
  //     { value: "last3Months", label: "Last 3 Months" },
  //     { value: "last6Months", label: "Last 6 Months" },
  //   ];

  const handleSelectChange = (value: string) => {
    if (value === "last3Months" || value === "last6Months") {
      setSelectedPeriod(value);
    }
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-secondary">Income</h4>
        {/* <SelectInput
          id="income-period-select"
          selectOptions={selectOptions}
          value={selectedPeriod}
          onChange={(value) => setSelectedPeriod(value as periodOptions)}
        /> */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              size="default"
              variant="secondary"
              className="bg-background font-normal aria-expanded:bg-background w-fit"
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
              onClick={() => handleSelectChange("last3Months")}
            >
              Last 3 Months
            </Button>
            <Button
              className="bg-transparent hover:bg-card text-primary font-normal"
              size="default"
              onClick={() => handleSelectChange("last6Months")}
            >
              Last 6 Months
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      <IncomeChart
        transactions={transactions}
        selectedPeriod={selectedPeriod}
      />
    </div>
  );
};

export default IncomePanel;
