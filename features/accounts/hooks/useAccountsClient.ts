import { useQuery } from "@tanstack/react-query";

export function useAccountsClient() {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
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
    },
  });
}
