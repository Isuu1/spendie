import { toastStyle } from "@/shared/styles/toastStyle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removePlaidItem } from "../actions/removePlaidItem";

export function useRemovePlaidItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (plaidItemDbId: string) =>
      await removePlaidItem(plaidItemDbId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts", "transactions"] });
      toast.success("Plaid item removed successfully!", toastStyle);
    },
    onError: (error) => {
      console.error("Error removing Plaid item:", error);
      toast.error("Failed to remove Plaid item. Please try again.", toastStyle);
    },
  });
}
