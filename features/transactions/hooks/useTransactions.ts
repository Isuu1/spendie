"use client";

import { useQuery } from "@tanstack/react-query";
import { getTransactionsClient } from "../api/getTransactionsClient";

export function useTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactionsClient,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
