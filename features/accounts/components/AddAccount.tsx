import { getUserServer } from "@/features/user/api/getUserServer";
import PlaidLink from "@/shared/components/PlaidLink/PlaidLink";
import React from "react";

const AddAccount: React.FC = async () => {
  const { user, error } = await getUserServer();

  if (error) {
    return <div>Error loading user data</div>;
  }

  return <div>{user && <PlaidLink userId={user.id} />}</div>;
};

export default AddAccount;
