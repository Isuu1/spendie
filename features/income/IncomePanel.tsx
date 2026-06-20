import React from "react";
import { useTransactions } from "../transactions/hooks/useTransactions";
import dayjs from "dayjs";
import { getTransactionsInPeriod } from "../transactions/lib/utils/getTransactionsInPeriod";

import { Area, AreaChart, XAxis } from "recharts";
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegendContent,
  ChartLegend,
} from "@/components/ui/chart";

const IncomePanel = () => {
  const { data: transactions } = useTransactions();
  console.log(transactions);

  const chartConfig = {
    amount: {
      label: "Amount",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  const startOfMonth = dayjs().startOf("month");
  const endOfMonth = dayjs().endOf("month");

  const thisMonthTransactions = getTransactionsInPeriod(
    transactions,
    startOfMonth,
    endOfMonth,
  );

  const previousMonthTransactions = getTransactionsInPeriod(
    transactions,
    startOfMonth.subtract(1, "month"),
    endOfMonth.subtract(1, "month"),
  );

  const twoMonthsAgoTransactions = getTransactionsInPeriod(
    transactions,
    startOfMonth.subtract(2, "month"),
    endOfMonth.subtract(2, "month"),
  );

  console.log("This Month Transactions:", thisMonthTransactions);
  console.log("Previous Month Transactions:", previousMonthTransactions);
  console.log("Two Months Ago Transactions:", twoMonthsAgoTransactions);

  const thisMonthIncome = thisMonthTransactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const previousMonthIncome = previousMonthTransactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const twoMonthsAgoIncome = twoMonthsAgoTransactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  console.log("This Month Income:", thisMonthIncome);
  console.log("Previous Month Income:", previousMonthIncome);

  const chartData = [
    {
      month: startOfMonth.subtract(2, "month").format("MMM"),
      income: twoMonthsAgoIncome,
    },
    {
      month: startOfMonth.subtract(1, "month").format("MMM"),
      income: previousMonthIncome,
    },
    {
      month: startOfMonth.format("MMM"),
      income: thisMonthIncome,
    },
  ];
  return (
    <div>
      <h4 className="text-secondary">Income</h4>
      <ChartContainer config={chartConfig}>
        <AreaChart width={500} height={300} data={chartData}>
          <Area dataKey="income" fill="#8884d8" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <XAxis dataKey="month" />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default IncomePanel;
