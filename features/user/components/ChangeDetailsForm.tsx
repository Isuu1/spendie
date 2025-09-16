"use client";

import React, { useRef, useState } from "react";
//Components
import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
//Types
import { UserProfile } from "@/features/user/types/user";

import { z } from "zod";

const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email(),
});

interface ChangeDetailsFormProps {
  user: UserProfile;
}

const ChangeDetailsForm: React.FC<ChangeDetailsFormProps> = ({ user }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
  });
  // const [error, setError] = useState<null | Record<string, string>>(null);
  const [error, setError] = useState<{
    username: string | null;
    email: string | null;
  }>({
    username: null,
    email: null,
  });

  console.log(formData);

  const formRef = useRef<HTMLFormElement>(null);

  const handleCloseForm = () => {
    setEditMode(false);
    setError({ username: null, email: null });
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handleEditFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const updatedFormData = { ...formData, [id]: value };
    setFormData(updatedFormData);
    const result = userSchema.safeParse(updatedFormData);
    if (!result.success) {
      const fieldErrors: { username: string | null; email: string | null } = {
        username: null,
        email: null,
      };
      result.error.errors.forEach((err) => {
        if (err.path[0] === "username" || err.path[0] === "email") {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setError(fieldErrors);
    } else {
      setError({ username: null, email: null });
    }
    setEditMode(true);
  };

  console.log("Error:", error);

  return (
    <Form layout="vertical" ref={formRef}>
      <Input
        layout="vertical"
        id="username"
        type="text"
        label="Username"
        defaultValue={user.username}
        onChange={handleEditFields}
      />
      {error?.username && (
        <p style={{ color: "red", fontSize: "0.8rem" }}>{error.username}</p>
      )}
      <Input
        layout="vertical"
        id="email"
        type="email"
        label="Email"
        defaultValue={user.email}
        onChange={handleEditFields}
      />
      {error?.email && (
        <p style={{ color: "red", fontSize: "0.8rem" }}>{error.email}</p>
      )}
      <div style={{ display: "flex", gap: "1rem", marginLeft: "auto" }}>
        <Button
          text="Save changes"
          variant="primary"
          type="submit"
          size="medium"
          disabled={
            !editMode || error?.email !== null || error?.username !== null
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
