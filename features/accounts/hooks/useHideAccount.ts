import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastStyle } from "@/shared/styles/toastStyle";
import toast from "react-hot-toast";
import { hideAccount } from "../lib/actions/hideAccount";

export function useHideAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (accountId: string) => {
      await hideAccount(accountId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      toast.success("Account hidden successfully!", toastStyle);
    },
    onError: (error) => {
      console.error("Error hiding account:", error);
      toast.error("Failed to hide account. Please try again.", toastStyle);
    },
  });
}
