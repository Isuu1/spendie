import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { toastStyle } from "@/shared/styles/toastStyle";
import { deletePaymentHistory } from "../lib/actions/deletePaymentHistory";

export function useDeletePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (paymentId: string) => {
      const result = await deletePaymentHistory(paymentId);

      return result;
    },
    onSuccess: () => {
      toast.success("Payment history deleted successfully.", toastStyle);

      queryClient.invalidateQueries({
        queryKey: ["paymentsHistory"],
      });
    },

    onError: (error: Error) => {
      toast.error(error.message, toastStyle);
    },
  });
}
