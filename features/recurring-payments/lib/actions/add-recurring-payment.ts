export async function addRecurringPayment(formData: FormData): Promise<void> {
  const data = {
    name: formData.get("name"),
    repeat: formData.get("repeat"),
    amount: formData.get("amount"),
  };
  console.log("Adding recurring payment:", data);
}
