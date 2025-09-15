import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
import React from "react";
import { UserProfile } from "../types/user";

interface ChangeDetailsFormProps {
  user: UserProfile;
}

const ChangeDetailsForm: React.FC<ChangeDetailsFormProps> = ({ user }) => {
  return (
    <Form layout="vertical">
      <Input
        layout="vertical"
        id="username"
        type="text"
        label="Username"
        defaultValue={user.username}
      />
      <Input
        layout="vertical"
        id="email"
        type="email"
        label="Email"
        defaultValue={user.email}
      />
      <Input layout="vertical" id="password" type="password" label="Password" />
    </Form>
  );
};

export default ChangeDetailsForm;
