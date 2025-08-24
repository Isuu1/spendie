import { getRecurringPayments } from "@/features/recurring-payments/api/getRecurringPayments";

export async function getSoonestRecurringPayment(type: string) {
  const payment = await getRecurringPayments();
  console.log("getSoonestRecurringPayment payment", payment);
  const filteredByType = payment?.filter(
    (recurringPayment) => recurringPayment.type.toLowerCase() === type
  );
  console.log("filteredByType", filteredByType);
  //Compare dates and find the soonest payment
  if (!filteredByType || filteredByType.length === 0) {
    return null; // No recurring payments of this type
  }
  const sortedPayments = filteredByType.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
  console.log("sortedPayments", sortedPayments);
  const soonestPayment = sortedPayments[0];
  if (!soonestPayment) {
    return null;
  }
  return soonestPayment;
}
