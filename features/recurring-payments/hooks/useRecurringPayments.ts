"use client";

import { useQuery } from "@tanstack/react-query";
import { getRecurringPaymentsClient } from "../api/getRecurringPaymentsClient";

export function useRecurringPayments() {
  return useQuery({
    queryKey: ["recurringPayments"],
    queryFn: getRecurringPaymentsClient,
  });
}
