import { useQuery } from "@tanstack/react-query";
import { getAccountsClient } from "../api/getAccountsClient";

export function useAccounts() {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: getAccountsClient,
    staleTime: 1000 * 60, //1 minute
    placeholderData: [],
  });
}
