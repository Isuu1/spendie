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
import { Settings } from "lucide-react";

const UserProfileCard: React.FC = () => {
  const { data: user, error } = useUser();

  if (error) {
    return <div>Error loading user data</div>;
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Image
          className="rounded-full cursor-pointer"
          src={user?.avatar || "https://i.pravatar.cc/150?img=3"}
          alt=""
          width={30}
          height={30}
        />
      </PopoverTrigger>
      <PopoverContent sideOffset={30} className="text-primary">
        <p>{user?.email}</p>

        <Link href="/user/account-details" className="flex gap-2 items-center">
          <Settings />
          <span>Settings</span>
        </Link>

        <Signout />
      </PopoverContent>
    </Popover>
  );
};

export default UserProfileCard;
