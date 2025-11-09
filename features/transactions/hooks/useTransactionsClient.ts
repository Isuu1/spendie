"use client";

import { useQuery } from "@tanstack/react-query";

export function useTransactionsClient() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/plaid/transactions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch transactions");
      }

      const transactions = await response.json();
      return transactions;
    },
    // retry logic:
    retry: 1, // try once after SSR failure
    refetchOnMount: true, // allow client to reattempt after hydration
  });
}
