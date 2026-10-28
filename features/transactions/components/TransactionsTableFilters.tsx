//Components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Button from "@/shared/components/ui/Button";
import Checkbox from "@/shared/components/ui/Checkbox";
//Icons
import { ListFilter } from "lucide-react";
//Types
import { Transaction } from "../types/transaction";
import { Table } from "@tanstack/react-table";

const CATEGORY_GROUPS = [
  {
    label: "Food & Drink",
    values: ["FOOD_AND_DRINK"],
  },
  {
    label: "Bills & Utilities",
    values: ["BILLS"],
  },
  {
    label: "Travel & Transportation",
    values: ["TRAVEL", "TRANSPORTATION"],
  },
  {
    label: "Loans & Debt",
    values: ["LOANS"],
  },
  {
    label: "Income",
    values: ["INCOME"],
  },
  {
    label: "Transfers",
    values: ["TRANSFER_IN", "TRANSFER_OUT"],
  },
  {
    label: "Entertainment",
    values: ["ENTERTAINMENT"],
  },
  {
    label: "Health & Wellness",
    values: ["MEDICAL", "HEALTH_AND_FITNESS"],
  },
  {
    label: "Home",
    values: ["HOME_IMPROVEMENT", "RENT_AND_UTILITIES"],
  },
  {
    label: "Personal Care",
    values: ["PERSONAL_CARE"],
  },
  {
    label: "Fees & Financial",
    values: ["BANK_FEES", "FINANCIAL"],
  },
  {
    label: "Government & Taxes",
    values: ["GOVERNMENT_AND_NON_PROFIT", "TAXES"],
  },
  {
    label: "Other",
    values: ["GENERAL_SERVICES", "OTHER", "UNCATEGORIZED"],
  },
] as const;

type TransactionsTableFiltersProps = {
  table: Table<Transaction>;
};

const TransactionsTableFilters = ({ table }: TransactionsTableFiltersProps) => {
  //Grab the column API directly
  const categoryColumn = table.getColumn("category");
  //Safely read its current filter array (fallback to empty array)
  const activeFilters = (categoryColumn?.getFilterValue() as string[]) ?? [];

  const toggleCategoryGroup = (values: readonly string[], checked: boolean) => {
    const nextFilters = checked
      ? [...new Set([...activeFilters, ...values])]
      : activeFilters.filter((value) => !values.includes(value));

    categoryColumn?.setFilterValue(
      nextFilters.length > 0 ? nextFilters : undefined,
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild className="w-fit justify-self-end">
        <Button
          icon={<ListFilter />}
          iconPosition="left"
          variant="secondary"
          size="sm"
          className="rounded-full bg-background px-3"
        >
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={16}>
        {CATEGORY_GROUPS.map((group) => {
          const isChecked = group.values.every((value) =>
            activeFilters.includes(value),
          );

          return (
            <Checkbox
              key={group.label}
              id={group.label}
              label={group.label}
              checked={isChecked}
              onCheckedChange={(checked) =>
                toggleCategoryGroup(group.values, checked === true)
              }
            />
          );
        })}
        {activeFilters.length > 0 && (
          <Button
            variant="default"
            size="sm"
            onClick={() => categoryColumn?.setFilterValue(undefined)}
          >
            Clear Filters
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default TransactionsTableFilters;
