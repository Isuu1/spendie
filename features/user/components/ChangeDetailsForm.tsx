"use client";

import React, { useRef, useState } from "react";
//Components
import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
//Types
import { UserProfile } from "@/features/user/types/user";

interface ChangeDetailsFormProps {
  user: UserProfile;
}

const ChangeDetailsForm: React.FC<ChangeDetailsFormProps> = ({ user }) => {
  const [editMode, setEditMode] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const handleCloseForm = () => {
    setEditMode(false);
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <Form layout="vertical" ref={formRef}>
      <Input
        layout="vertical"
        id="username"
        type="text"
        label="Username"
        defaultValue={user.username}
        onChange={() => setEditMode(true)}
      />
      <Input
        layout="vertical"
        id="email"
        type="email"
        label="Email"
        defaultValue={user.email}
        onChange={() => setEditMode(true)}
      />
      <div style={{ display: "flex", gap: "1rem", marginLeft: "auto" }}>
        <Button
          text="Save changes"
          variant="primary"
          type="submit"
          size="medium"
          disabled={!editMode}
        />
        {editMode && (
          <Button
            text="Cancel"
            variant="secondary"
            type="button"
            size="medium"
            onClick={() => handleCloseForm()}
          />
        )}
      </div>
    </Form>
  );
};

export default ChangeDetailsForm;
