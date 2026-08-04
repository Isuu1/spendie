import React, { useState } from "react";
import { useTransactions } from "../transactions/hooks/useTransactions";
import Button from "@/shared/components/ui/Button";
import IncomeChart from "./IncomeChart";

type periodOptions = "last3Months" | "last6Months";

const IncomePanel = () => {
  const { data: transactions } = useTransactions();

  console.log("transactions", transactions);

  const [selectedPeriod, setSelectedPeriod] =
    useState<periodOptions>("last3Months");

  const handleSelectChange = (value: string) => {
    if (value === "last3Months" || value === "last6Months") {
      setSelectedPeriod(value);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-secondary">Income</h4>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            className={`bg-background ${
              selectedPeriod === "last6Months" ? "bg-accent" : ""
            }`}
            onClick={() => handleSelectChange("last6Months")}
          >
            Last 6 months
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className={`bg-background ${
              selectedPeriod === "last3Months" ? "bg-accent" : ""
            }`}
            onClick={() => handleSelectChange("last3Months")}
          >
            Last 3 months
          </Button>
        </div>
      </div>

      {transactions && transactions.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No income data available for the selected period.
        </p>
      ) : (
        <IncomeChart
          transactions={transactions}
          selectedPeriod={selectedPeriod}
        />
      )}
    </div>
  );
};

export default IncomePanel;
