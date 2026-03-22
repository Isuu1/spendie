export async function getAccountsClient() {
  const res = await fetch("/api/plaid/accounts");

  if (!res.ok) {
    throw new Error("Failed to fetch accounts");
  }

  return res.json() ?? [];
}
