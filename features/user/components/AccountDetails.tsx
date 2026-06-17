"use client";

import React from "react";
//Components
import ChangeDetailsForm from "./ChangeDetailsForm";
import ChangePasswordForm from "./ChangePasswordForm";
import ChangeAvatarForm from "./ChangeAvatarForm";
import ErrorMessage from "@/shared/components/ErrorMessage";
//Hooks
import { useUser } from "../hooks/useUser";
import { Separator } from "@/components/ui/separator";

const AccountDetails: React.FC = () => {
  const { data: user, error } = useUser();

  if (error || !user) {
    return (
      <>
        <h3>Account</h3>
        <ErrorMessage message="Failed to load your account from the server." />
      </>
    );
  }

  return (
    <div className="grid grid-cols-[1fr_1.5fr] gap-12 py-6">
      <div className="flex flex-col gap-3">
        <p className="text-lg font-bold">Profile</p>
        <p>Set up your profile details.</p>
      </div>

      <div className="flex gap-12">
        <ChangeDetailsForm user={user} />
        <ChangeAvatarForm user={user} />
      </div>
      <Separator className="col-span-2 bg-card-foreground" />
      <div className="flex flex-col gap-3">
        <p className="text-lg font-bold">Password</p>
        <p>Change your password.</p>
      </div>

      <div>
        <ChangePasswordForm user={user} />
      </div>
    </div>
  );
};

export default AccountDetails;
