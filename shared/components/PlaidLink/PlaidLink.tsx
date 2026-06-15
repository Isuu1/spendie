"use client";

import { useCallback, useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { Landmark } from "lucide-react";

type PlaidLinkProps = {
  userId: string; // Pass the authenticated user ID
  variant?: VariantProps<typeof buttonVariants>["variant"];
};

const PlaidLink = ({ userId, variant }: PlaidLinkProps) => {
  const [linkToken, setLinkToken] = useState<string | null>(null);

  const router = useRouter();

  // Fetch the link token from your API when the component mounts
  useEffect(() => {
    const createLinkToken = async () => {
      const response = await fetch("/api/plaid/create_link_token", {
        method: "POST",
      });
      const data = await response.json();
      setLinkToken(data.link_token);
    };

    createLinkToken();
  }, [userId]); // Re-fetch if user ID changes

  const onSuccess = useCallback(
    async (public_token: string) => {
      // Exchange the public_token for an access_token on your server
      const response = await fetch("/api/plaid/exchange_public_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_token, userId }), // Pass user ID to associate the item
      });
      const data = await response.json();
      if (data.error) {
        console.error("Error exchanging public token:", data.error);
        // Handle error (e.g., show an error message to the user)
      } else {
        console.log("Item linked successfully:", data);
        // Optionally trigger a data refresh or redirect
        router.refresh();
      }
    },
    [userId, router], // Include userId and router in the dependency array
  );

  const onEvent = useCallback((eventName: string, metadata: unknown) => {
    console.log("Plaid Link Event:", eventName, metadata);
    // Optional: Log Plaid Link events for analytics or debugging
  }, []);

  const onExit = useCallback((error: unknown, metadata: unknown) => {
    console.log("Plaid Link Exit:", error, metadata);
    // Handle the user exiting the Link flow
    if (error != null) {
      // Handle error (e.g., show an error message based on the error object)
    }
  }, []);

  const config = {
    token: linkToken,
    onSuccess,
    onEvent,
    onExit,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <Button
      variant={variant}
      size="default"
      className="bg-background"
      onClick={() => open()}
      disabled={!ready || !linkToken}
      icon={<Landmark />}
      iconPosition="left"
    >
      Connect bank account
    </Button>
  );
};

export default PlaidLink;
