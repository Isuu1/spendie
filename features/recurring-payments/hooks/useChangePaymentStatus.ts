import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePaymentStatus } from "../lib/actions/changePaymentStatus";
import { toastStyle } from "@/shared/styles/toastStyle";
import toast from "react-hot-toast";

export function useChangePaymentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      paymentId,
      isPaused,
    }: {
      paymentId: string;
      isPaused: boolean;
    }) => {
      const result = await changePaymentStatus(paymentId, isPaused);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recurringPayments"],
      });
    },

    onError: (error: Error) => {
      toast.error(error.message, toastStyle);
    },
  });
}
