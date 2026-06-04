"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
//Hooks
import { useUser } from "../hooks/useUser";
//Components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Signout from "@/shared/components/Signout";
//Icons
import { ChevronDown, Settings } from "lucide-react";
import { cn } from "@/shared/lib/cn";

const UserProfileCard: React.FC = () => {
  const { data: user, error } = useUser();

  if (error) {
    return <div>Error loading user data</div>;
  }

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer p-1 rounded-full bg-card flex gap-2 items-center">
        <Image
          className="rounded-full cursor-pointer"
          src={user?.avatar || "https://i.pravatar.cc/150?img=3"}
          alt=""
          width={30}
          height={30}
        />
        <ChevronDown size={18} />
      </PopoverTrigger>
      <PopoverContent sideOffset={20} className="text-primary gap-2">
        <div className="flex flex-col items-center gap-2 mb-2">
          <p>{user?.email}</p>
          <Image
            className="rounded-full"
            src={user?.avatar || "https://i.pravatar.cc/150?img=3"}
            alt=""
            width={60}
            height={60}
          />
          <p className="text-lg">Welcome, {user?.name}</p>
        </div>
        <Link
          href="/settings/account-details"
          className={cn(
            "flex gap-2 items-center transition-colors p-2 rounded-lg",
            "hover:bg-card-foreground",
          )}
        >
          <Settings size={16} />
          <span>Settings</span>
        </Link>

        <Signout
          className={cn(
            "bg-transparent hover:bg-card-foreground text-red-500 p-2 justify-start",
            "transition-colors rounded-lg",
          )}
        />
      </PopoverContent>
    </Popover>
  );
};

export default UserProfileCard;
