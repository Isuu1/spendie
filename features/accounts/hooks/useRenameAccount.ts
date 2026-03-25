import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { toastStyle } from "@/shared/styles/toastStyle";
import { renameAccount } from "../lib/actions/renameAccount";

type RenameAccountParams = {
  accountId: string;
  userName: string;
};

export function useRenameAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ accountId, userName }: RenameAccountParams) =>
      await renameAccount({ accountId, userName }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      toast.success("Account renamed successfully!", toastStyle);
    },
    onError: (error) => {
      console.error("Error renaming account:", error);
      toast.error("Failed to rename account. Please try again.", toastStyle);
    },
  });
}
