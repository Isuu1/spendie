import { useMutation, useQueryClient } from "@tanstack/react-query";
import { syncAccountAction } from "../lib/actions/syncAccountAction";

export function useSyncAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: syncAccountAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
}
