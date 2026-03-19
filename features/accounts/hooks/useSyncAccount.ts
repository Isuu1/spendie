import { useMutation, useQueryClient } from "@tanstack/react-query";
import { syncAccountAction } from "../lib/actions/syncAccountAction";

export function useSyncAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => syncAccountAction(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["plaid_items"] });
    },
  });
}
