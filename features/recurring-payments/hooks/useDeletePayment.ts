import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecurringPayment } from "../lib/actions/deleteRecurringPayment";
import toast from "react-hot-toast";
import { toastStyle } from "@/shared/styles/toastStyle";

export function useDeletePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (paymentId: string) => {
      const result = await deleteRecurringPayment(paymentId);

      return result;
    },
    onSuccess: () => {
      toast.success("Payment deleted successfully.", toastStyle);

      queryClient.invalidateQueries({
        queryKey: ["recurringPayments"],
      });
    },

    onError: (error: Error) => {
      toast.error(error.message, toastStyle);
    },
  });
}
