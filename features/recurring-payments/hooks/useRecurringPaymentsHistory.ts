"use client";
import { useQuery } from "@tanstack/react-query";
import { getRecurringPaymentsHistoryClient } from "../api/getRecurringPaymentsHistoryClient";

export function useRecurringPaymentsHistory() {
  return useQuery({
    queryKey: ["paymentsHistory"],
    queryFn: getRecurringPaymentsHistoryClient,
    staleTime: 60 * 1000, // 1 minute
  });
}
