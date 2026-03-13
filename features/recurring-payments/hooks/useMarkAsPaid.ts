import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { markAsPaid } from "../lib/actions/markAsPaid";
import { RecurringPayment } from "../types/recurring-payment";
import { toastStyle } from "@/shared/styles/toastStyle";

export function useMarkAsPaid() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payment: RecurringPayment) => {
      const result = await markAsPaid(payment);

      return result;
    },

    onMutate: async (payment) => {
      await queryClient.cancelQueries({ queryKey: ["recurringPayments"] });

      const previous = queryClient.getQueryData<RecurringPayment[]>([
        "recurringPayments",
      ]);

      queryClient.setQueryData<RecurringPayment[]>(
        ["recurringPayments"],
        (old = []) => old.filter((p) => p.id !== payment.id),
      );

      return { previous };
    },

    onSuccess: () => {
      toast.success("Payment marked as paid.", toastStyle);

      queryClient.invalidateQueries({
        queryKey: ["recurringPayments"],
      });
    },

    onError: (error: Error) => {
      toast.error(error.message, toastStyle);
    },
  });
}
