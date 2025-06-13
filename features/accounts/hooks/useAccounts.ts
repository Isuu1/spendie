import { useQuery } from "@tanstack/react-query";
import { getAccountsClient } from "../api/client";
import { Account } from "@/shared/types/account";

export function useAccounts() {
  return useQuery<Account[], Error>({
    queryKey: ["accounts"],
    queryFn: getAccountsClient,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
}
