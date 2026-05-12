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
    <div className="flex items-center gap-4">
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
    </div>
  );
};

export default DashboardOptions;
