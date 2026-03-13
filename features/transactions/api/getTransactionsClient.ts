export async function getTransactionsClient() {
  const res = await fetch("/api/plaid/transactions");

  if (!res.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return res.json() ?? [];
}
