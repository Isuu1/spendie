"use client";

import React, { useMemo } from "react";
import { useState } from "react";
import { cn } from "@/shared/lib/cn";
import dayjs from "dayjs";
//Animations
import { motion } from "motion/react";
//Types
import { RecurringPayment } from "@/features/recurring-payments/types/recurringPayment";
//Components
import Pagination from "@/shared/components/Pagination";
import DashboardPaymentItem from "./DashboardPaymentItem";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
//Utils
import { sortDashboardRecurringPayments } from "../lib/utils/sortDashboardRecurringPayments";
//Hooks
import { usePagination } from "@/shared/hooks/usePagination";

type DashboardPaymentsGridProps = {
  type: "income" | "expense";
  toggleDetails: (type: "income" | "expense" | null) => void;
  payments: RecurringPayment[];
  selectedDate: dayjs.Dayjs | null;
};

const activeIndicatorVariants = {
  income: { x: 0 },
  expense: { x: "100%" },
};

const DashboardPaymentsGrid = ({
  type,
  toggleDetails,
  payments,
  selectedDate,
}: DashboardPaymentsGridProps) => {
  const [sortingOption, setSortingOption] = useState<"name" | "date">("date");

  const sortedPayments = useMemo(() => {
    return sortDashboardRecurringPayments(payments, sortingOption);
  }, [payments, sortingOption]);

  const { page, setPage, totalPages, currentItems } = usePagination(
    sortedPayments,
    4,
  );

  const handleSortingChange = (option: "name" | "date") => {
    setSortingOption(option);
    setPage(1); //Reset to first page on sorting change
  };

  return (
    <>
      <div className="relative flex gap-2 bg-card rounded-b-lg">
        <motion.span
          className="z-1 absolute top-0 bottom-0 left-0 h-full w-[50%] bg-accent rounded-lg"
          variants={activeIndicatorVariants}
          animate={type}
          initial={false} //Prevent animation on initial render
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
        ></motion.span>
        <span
          className="z-2 relative cursor-pointer px-3 py-1 rounded-lg"
          onClick={() => toggleDetails?.("income")}
        >
          Income
        </span>
        <span
          className="z-2 relative cursor-pointer px-3 py-1 rounded-lg"
          onClick={() => toggleDetails?.("expense")}
        >
          Expense
        </span>
      </div>

      {sortedPayments.length === 0 ? (
        <p className="text-center p2 text-secondary">
          No upcoming payments by{" "}
          {selectedDate
            ? `${selectedDate.format("DD MMM YYYY")}`
            : "end of month"}
        </p>
      ) : (
        <Table>
          <TableCaption>
            A list of your upcoming payments by{" "}
            {selectedDate
              ? `${selectedDate.format("DD MMM YYYY")}`
              : "end of month"}
            .
          </TableCaption>
          <TableHeader>
            <TableRow className="hover:bg-card">
              <TableHead
                className={cn(
                  "w-25 cursor-pointer",
                  sortingOption === "name" && "font-bold",
                )}
                onClick={() => handleSortingChange("name")}
              >
                Name
              </TableHead>
              <TableHead
                className={cn(
                  "w-25 cursor-pointer",
                  sortingOption === "date" && "font-bold",
                )}
                onClick={() => handleSortingChange("date")}
              >
                Date
              </TableHead>
              <TableHead>Repeat</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((payment) => (
              <DashboardPaymentItem
                key={`${payment.id}-${payment.next_payment_date}`}
                payment={payment}
              />
            ))}
          </TableBody>
        </Table>
      )}

      {totalPages > 1 && (
        <Pagination
          page={page}
          onPageChange={setPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
};

export default DashboardPaymentsGrid;
