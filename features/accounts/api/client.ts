export async function getAccountsClient() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/plaid/accounts`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch accounts");
    }

    const accounts = await response.json();
    return accounts;
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
}
