import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatAmount } from "@/shared/lib/utils/formatAmount";
import {
  Bar,
  BarChart,
  //CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { Transaction } from "../transactions/types/transaction";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useUserSettings } from "../user/hooks/useUserSettings";

const chartConfig = {
  amount: {
    label: "Amount",
    color: "#d34702",
  },
} satisfies ChartConfig;

type IncomeChartProps = {
  transactions: Transaction[];
  selectedPeriod: "last3Months" | "last6Months";
};

const IncomeChart = ({ transactions, selectedPeriod }: IncomeChartProps) => {
  const { data: settings } = useUserSettings();

  const periodMap = {
    last3Months: 3,
    last6Months: 6,
  } as const;

  const monthsToShow = periodMap[selectedPeriod];

  const chartData = useMemo(() => {
    const incomeByMonth = new Map<string, number>();

    transactions.forEach((transaction) => {
      if (transaction.amount >= 0) return;

      const monthKey = dayjs(transaction.date).format("YYYY-MM");

      incomeByMonth.set(
        monthKey,
        (incomeByMonth.get(monthKey) ?? 0) + Math.abs(transaction.amount),
      );
    });

    return Array.from({ length: monthsToShow }, (_, index) => {
      const month = dayjs().subtract(monthsToShow - 1 - index, "month");
      const monthKey = month.format("YYYY-MM");

      return {
        month: month.format("MMM"),
        income: incomeByMonth.get(monthKey) ?? 0,
      };
    });
  }, [transactions, monthsToShow]);
  return (
    <ChartContainer config={chartConfig} className="mt-4 h-[250px]">
      <BarChart
        accessibilityLayer
        data={chartData}
        barSize={60}
        margin={{ top: 12, left: 4, right: 4 }}
      >
        {/* <CartesianGrid vertical={false} stroke="#424654" /> */}
        <Bar
          dataKey="income"
          fill="#d34702"
          radius={10}
          className="hover:fill-accent-foreground"
        >
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
            content={(props) => {
              const { x, y, value } = props;
              const numericValue = Number(value ?? 0);
              const amount = formatAmount(
                numericValue,
                settings?.currency || "USD",
              ).displayAmount;

              return (
                <text x={x} y={y} dy={-10} className="fill-primary text-xs">
                  {amount}
                </text>
              );
            }}
          />
        </Bar>
        <ChartTooltip
          content={
            <ChartTooltipContent
              indicator="line"
              hideLabel
              className="bg-background border-0 gap-10"
              formatter={(value, name) => {
                // ensure value is a number (formatter may receive undefined)
                const numericValue = Number(value ?? 0);
                const amount = formatAmount(
                  numericValue,
                  settings?.currency || "USD",
                ).displayAmount;
                const label = name === "income" ? "Income" : name;
                return (
                  <span className="flex items-center gap-2">
                    <span className="bg-accent rounded-full size-3" />
                    <span>
                      {label}: {amount}
                    </span>
                  </span>
                );
              }}
            />
          }
          cursor={false}
        />
        <XAxis
          stroke="white"
          dataKey="month"
          type="category"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          stroke="white"
          dataKey="income"
          tickLine={false}
          axisLine={false}
          tickMargin={20}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default IncomeChart;
