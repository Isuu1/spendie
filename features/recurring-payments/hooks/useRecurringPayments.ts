"use client";

import { useQuery } from "@tanstack/react-query";
import { getRecurringPaymentsClient } from "../api/getRecurringPaymentsClient";

export function useRecurringPayments() {
  return useQuery({
    queryKey: ["recurringPayments"],
    queryFn: getRecurringPaymentsClient,
    staleTime: 1000 * 60, //1 minute
  });
}
