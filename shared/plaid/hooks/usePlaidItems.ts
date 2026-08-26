import { useQuery } from "@tanstack/react-query";
import { getPlaidItemsClient } from "../api/getPlaidItemsClient";

export function usePlaidItems() {
  return useQuery({
    queryKey: ["plaid_items"],
    queryFn: () => getPlaidItemsClient(),
  });
}
