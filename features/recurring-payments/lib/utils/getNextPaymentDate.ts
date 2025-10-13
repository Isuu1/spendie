import moment from "moment";

export function getNextPaymentDate(currentDate: string, repeat: string) {
  const date = moment(currentDate);
  if (repeat.toLowerCase() === "weekly") date.add(1, "week");
  else if (repeat.toLowerCase() === "monthly") date.add(1, "month");
  return date.format("YYYY-MM-DD");
}
