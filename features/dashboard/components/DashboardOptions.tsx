"use client";

import React from "react";
//Components
import Button from "@/shared/components/ui/Button";
import DashboardPanelsMenu from "./DashboardPanelsMenu";
import PlaidLink from "@/shared/components/PlaidLink/PlaidLink";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover";
//Hooks
import { useUser } from "@/features/user/hooks/useUser";
//Icons
import { LayoutDashboard } from "lucide-react";

const DashboardOptions = () => {
  const { data: user } = useUser();

  return (
    <div className="flex items-center flex-wrap gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            size="default"
            icon={<LayoutDashboard />}
            iconPosition="left"
          >
            Manage panels
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-card w-auto" align="start">
          <PopoverHeader className="text-white">Manage Panels</PopoverHeader>
          <DashboardPanelsMenu />
        </PopoverContent>
      </Popover>
      <PlaidLink userId={user?.id ?? ""} variant="secondary" />

      <Button
        onClick={async () => {
          const response = await fetch("/api/test/create-sandbox-transaction", {
            method: "POST",
          });

          const data = await response.json();

          console.log(data);
        }}
      >
        Create Sandbox Transaction
      </Button>

      <Button
        onClick={async () => {
          const response = await fetch("/api/test/sync-transactions", {
            method: "POST",
          });

          const data = await response.json();

          console.log(data);
        }}
      >
        Test Transaction Sync
      </Button>
      <Button
        onClick={async () => {
          const response = await fetch("/api/test/refresh-transactions", {
            method: "POST",
          });

          const data = await response.json();

          console.log(data);
        }}
      >
        Refresh Sandbox Transactions
      </Button>
      <Button
        onClick={async () => {
          const response = await fetch("/api/test/get-transactions", {
            method: "POST",
          });

          const data = await response.json();

          console.log(data);
        }}
      >
        Get Sandbox Transactions
      </Button>
      <Button
        onClick={async () => {
          const response = await fetch("/api/test/get-item", {
            method: "POST",
          });

          const data = await response.json();

          console.log("Plaid Item response:", data);
        }}
      >
        Get Item
      </Button>
      <Button
        onClick={async () => {
          const response = await fetch("/api/test/fire-webhook", {
            method: "POST",
          });

          const data = await response.json();

          console.log("Fire webhook response:", data);
        }}
      >
        Fire webhook
      </Button>
    </div>
  );
};

export default DashboardOptions;
