import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { toastStyle } from "@/shared/styles/toastStyle";
import { syncPlaidItem } from "../api/syncPlaidItem";

export function useSyncPlaidItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (plaidItemDbId: string) => syncPlaidItem(plaidItemDbId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["plaid_items"] });

      toast.success("Account synced successfully!", toastStyle);
    },

    onError: (error) => {
      console.error("Error syncing Plaid Item:", error);

      toast.error("Failed to sync account. Please try again.", toastStyle);
    },
  });
}
