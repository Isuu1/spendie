import { useMutation, useQueryClient } from "@tanstack/react-query";
import { disconnectAccount } from "../lib/actions/disconnectAccount";
import { toastStyle } from "@/shared/styles/toastStyle";
import toast from "react-hot-toast";

export function useDisconnectAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (accountId: string) => {
      await disconnectAccount(accountId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (error) => {
      console.error("Error disconnecting account:", error);
      toast.error(
        "Failed to disconnect account. Please try again.",
        toastStyle,
      );
    },
  });
}
