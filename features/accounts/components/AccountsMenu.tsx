"use client";

//Hooks
import { useUser } from "@/features/user/hooks/useUser";
//Components
import Button from "@/shared/components/ui/Button";
import PlaidLink from "@/shared/components/PlaidLink/PlaidLink";
//Icons
import { RefreshCw } from "lucide-react";

const AccountsMenu = () => {
  const { data } = useUser();

  if (!data) {
    return null;
  }

  return (
    <div className="flex gap-3 mt-4">
      <Button
        variant="secondary"
        size="default"
        className="bg-background"
        icon={<RefreshCw />}
        iconPosition="left"
      >
        Sync all accounts
      </Button>
      <PlaidLink userId={data?.id} variant="default" />
    </div>
  );
};

export default AccountsMenu;
