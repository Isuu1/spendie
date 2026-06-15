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

const CATEGORIES = [
  { value: "FOOD_AND_DRINK", label: "Food and drink" },
  { value: "SHOPPING", label: "Shopping" },
  { value: "BILLS", label: "Bills" },
  { value: "TRAVEL", label: "Travel" },
  { value: "TRANSPORTATION", label: "Transportation" },
  { value: "LOANS", label: "Loans" },
];

type TransactionsTableFiltersProps = {
  table: Table<Transaction>;
};

const TransactionsTableFilters = ({ table }: TransactionsTableFiltersProps) => {
  //Grab the column API directly
  const categoryColumn = table.getColumn("category");
  //Safely read its current filter array (fallback to empty array)
  const activeFilters = (categoryColumn?.getFilterValue() as string[]) ?? [];

  return (
    <Popover>
      <PopoverTrigger className="w-fit justify-self-end">
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
        {CATEGORIES.map((cat) => (
          <Checkbox
            key={cat.value}
            id={cat.value}
            label={cat.label}
            checked={activeFilters.includes(cat.value)}
            onCheckedChange={(checked) => {
              if (checked) {
                categoryColumn?.setFilterValue([...activeFilters, cat.value]);
              } else {
                categoryColumn?.setFilterValue(
                  activeFilters.filter((v) => v !== cat.value),
                );
              }
            }}
          />
        ))}
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
