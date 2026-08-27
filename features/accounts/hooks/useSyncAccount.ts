import { useMutation, useQueryClient } from "@tanstack/react-query";
import { syncPlaidInstitutionAction } from "@/shared/plaid/actions/syncPlaidInstitutionAction";
import toast from "react-hot-toast";
import { toastStyle } from "@/shared/styles/toastStyle";

export function useSyncAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (plaidItemDbId: string) =>
      syncPlaidInstitutionAction(plaidItemDbId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["plaid_items"] });
      toast.success("Account synced successfully!", toastStyle);
    },
    onError: (error) => {
      console.error("Error syncing account:", error);
      toast.error("Failed to sync account. Please try again.", toastStyle);
    },
  });
}
