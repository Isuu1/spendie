"use client";

import React, { useState } from "react";
import { z } from "zod";
//Components
import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
//Types
import { UserProfile } from "@/features/user/types/user";
//Hooks
import { useForm } from "@/shared/hooks/useForm";

const accountDetailsSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email(),
});

interface ChangeDetailsFormProps {
  user: UserProfile;
}

const ChangeDetailsForm: React.FC<ChangeDetailsFormProps> = ({ user }) => {
  const [editMode, setEditMode] = useState(false);

  const { formData, errors, handleChange, resetForm } = useForm(
    accountDetailsSchema,
    {
      username: user.username,
      email: user.email,
    }
  );

  const handleCloseForm = () => {
    setEditMode(false);
    resetForm();
  };

  return (
    <Form layout="vertical">
      <Input
        layout="vertical"
        id="username"
        type="text"
        label="Username"
        value={formData.username}
        onChange={(e) => {
          handleChange("username", e.target.value);
          setEditMode(true);
        }}
        errors={errors.username}
      />
      <Input
        layout="vertical"
        id="email"
        type="email"
        label="Email"
        value={formData.email}
        onChange={(e) => {
          handleChange("email", e.target.value);
          setEditMode(true);
        }}
        errors={errors.email}
      />
      <div style={{ display: "flex", gap: "1rem", marginLeft: "auto" }}>
        <Button
          text="Save changes"
          variant="primary"
          type="submit"
          size="medium"
          disabled={
            !editMode ||
            Object.values(errors).some((errArr) => errArr.length > 0)
          }
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
