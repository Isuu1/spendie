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
  mode?: "connect" | "update"; // Optional mode prop to differentiate between connect and reauth
  plaidItemDbId?: number;
  children?: React.ReactNode;
};

const PlaidLink = ({
  userId,
  variant,
  mode = "connect",
  plaidItemDbId,
  children,
}: PlaidLinkProps) => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [isLoadingToken, setIsLoadingToken] = useState(false);
  const [shouldOpen, setShouldOpen] = useState(false);

  const router = useRouter();

  const createLinkToken = useCallback(async () => {
    try {
      setIsLoadingToken(true);

      const endpoint =
        mode === "update"
          ? "/api/plaid/create_update_link_token"
          : "/api/plaid/create_link_token";

      const body =
        mode === "update" ? JSON.stringify({ plaidItemDbId }) : undefined;

      const response = await fetch(endpoint, {
        method: "POST",
        headers:
          mode === "update"
            ? {
                "Content-Type": "application/json",
              }
            : undefined,
        body,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error creating Plaid Link token:", data.error);
        return;
      }

      setLinkToken(data.link_token);
    } catch (error) {
      console.error("Error fetching Plaid Link token:", error);
    } finally {
      setIsLoadingToken(false);
    }
  }, [mode, plaidItemDbId]);

  // Only pre-fetch the token for normal Connect mode.
  useEffect(() => {
    if (mode === "connect") {
      createLinkToken();
    }
  }, [mode, createLinkToken]);

  const onSuccess = useCallback(
    async (public_token: string) => {
      if (mode === "update") {
        const response = await fetch("/api/plaid/reconnect_item", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plaidItemDbId,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("Failed to reconnect Plaid Item:", data.error);
          return;
        }

        console.log("Plaid Item update completed successfully.");

        router.refresh();

        return;
      }

      const response = await fetch("/api/plaid/exchange_public_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_token,
          userId,
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("Error exchanging public token:", data.error);
        return;
      }

      console.log("Item linked successfully:", data);

      router.refresh();
    },
    [userId, router, mode, plaidItemDbId],
  );

  // Fetch the link token from your API when the component mounts
  // useEffect(() => {
  //   const createLinkToken = async () => {
  //     try {
  //       const endpoint =
  //         mode === "update"
  //           ? "/api/plaid/create_update_link_token"
  //           : "/api/plaid/create_link_token";

  //       const body =
  //         mode === "update" ? JSON.stringify({ plaidItemDbId }) : undefined;
  //       const response = await fetch(endpoint, {
  //         method: "POST",
  //         headers:
  //           mode === "update"
  //             ? {
  //                 "Content-Type": "application/json",
  //               }
  //             : undefined,
  //         body,
  //       });
  //       const data = await response.json();
  //       if (!response.ok) {
  //         console.error("Error creating Plaid Link token:", data.error);
  //         return;
  //       }
  //       setLinkToken(data.link_token);
  //     } catch (error) {
  //       console.error("Error fetching link token:", error);
  //       throw new Error("Failed to fetch link token");
  //     }
  //   };

  //   createLinkToken();
  // }, [userId, mode, plaidItemDbId]); // Re-fetch if user ID changes

  // const onSuccess = useCallback(
  //   async (public_token: string) => {
  //     if (mode === "update") {
  //       const response = await fetch("/api/plaid/reconnect_item", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           plaidItemDbId,
  //         }),
  //       });

  //       const data = await response.json();

  //       if (!response.ok) {
  //         console.error("Failed to reconnect Plaid Item:", data.error);
  //         return;
  //       }

  //       console.log("Plaid Item update completed successfully.");

  //       router.refresh();

  //       return;
  //     }
  //     // Exchange the public_token for an access_token on your server
  //     const response = await fetch("/api/plaid/exchange_public_token", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ public_token, userId }), // Pass user ID to associate the item
  //     });
  //     const data = await response.json();
  //     if (data.error) {
  //       console.error("Error exchanging public token:", data.error);
  //       // Handle error (e.g., show an error message to the user)
  //     } else {
  //       console.log("Item linked successfully:", data);
  //       // Optionally trigger a data refresh or redirect
  //       router.refresh();
  //     }
  //   },
  //   [userId, router, mode, plaidItemDbId], // Include userId and router in the dependency array
  // );

  const onEvent = useCallback((eventName: string, metadata: unknown) => {
    console.log("Plaid Link Event:", eventName, metadata);
    // Optional: Log Plaid Link events for analytics or debugging
  }, []);

  const onExit = useCallback((error: unknown, metadata: unknown) => {
    console.log("Plaid Link Exit:", error, metadata);

    // Reset this so Update Mode can be opened again
    // after the user exits Plaid Link.
    setShouldOpen(false);
  }, []);

  const config = {
    token: linkToken,
    onSuccess,
    onEvent,
    onExit,
  };

  const { open, ready } = usePlaidLink(config);

  // Open Plaid after a newly-created Update Mode token
  // has been loaded and Plaid Link is ready.
  useEffect(() => {
    if (shouldOpen && ready && linkToken) {
      setShouldOpen(false);
      open();
    }
  }, [shouldOpen, ready, linkToken, open]);

  const handleClick = async () => {
    if (mode === "update") {
      setLinkToken(null);
      setShouldOpen(true);
      await createLinkToken();
      return;
    }

    open();
  };

  const isDisabled =
    isLoadingToken || (mode === "connect" && (!ready || !linkToken));

  return (
    <Button
      variant={variant}
      size="default"
      onClick={handleClick}
      disabled={isDisabled}
      icon={<Landmark />}
      iconPosition="left"
    >
      {children ? children : "Connect bank account"}
    </Button>
  );
};

export default PlaidLink;
