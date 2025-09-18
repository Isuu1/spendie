"use client";

import React, { useRef, useState } from "react";
import { z } from "zod";
//Components
import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
//Types
import { UserProfile } from "@/features/user/types/user";
//Hooks
import { useForm } from "@/shared/hooks/useForm";

const passwordSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
});

interface ChangePasswordFormProps {
  user: UserProfile;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = () => {
  const [editMode, setEditMode] = useState(false);

  const { formData, errors, handleChange, resetForm } = useForm(
    passwordSchema,
    {
      newPassword: "",
      confirmPassword: "",
    }
  );

  console.log(formData);

  const formRef = useRef<HTMLFormElement>(null);

  const handleCloseForm = () => {
    setEditMode(false);
    resetForm();
  };

  return (
    <Form layout="vertical" ref={formRef}>
      <Input
        layout="vertical"
        id="newPassword"
        type="text"
        label="New password"
        defaultValue=""
        value={formData.newPassword}
        onChange={(e) => {
          handleChange("newPassword", e.target.value);
          setEditMode(true);
        }}
        errors={errors.newPassword}
      />
      <Input
        layout="vertical"
        id="confirmPassword"
        type="email"
        label="Confirm password"
        defaultValue=""
        value={formData.confirmPassword}
        onChange={(e) => {
          handleChange("confirmPassword", e.target.value);
          setEditMode(true);
        }}
        errors={errors.confirmPassword}
      />
      <div style={{ display: "flex", gap: "1rem", marginLeft: "auto" }}>
        <Button
          text="Change password"
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

export default ChangePasswordForm;
