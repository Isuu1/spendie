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
import { changeUserDetails } from "../actions/changeUserDetails";

const accountDetailsSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  name: z.string().min(2, "Name must be at least 2 characters long"),
  surname: z.string().min(2, "Surname must be at least 2 characters long"),
  dob: z.date().min(new Date(1900, 0, 1), "Invalid date of birth"),
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
      name: user.name,
      surname: user.surname,
      dob: user.dob,
      email: user.email,
    }
  );

  const handleCloseForm = () => {
    setEditMode(false);
    resetForm();
  };

  return (
    <Form layout="vertical" action={changeUserDetails}>
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
        id="name"
        type="text"
        label="Name"
        value={formData.name}
        onChange={(e) => {
          handleChange("name", e.target.value);
          setEditMode(true);
        }}
        errors={errors.name}
      />
      <Input
        layout="vertical"
        id="surname"
        type="text"
        label="Surname"
        value={formData.surname}
        onChange={(e) => {
          handleChange("surname", e.target.value);
          setEditMode(true);
        }}
        errors={errors.surname}
      />
      <Input
        layout="vertical"
        id="dob"
        type="date"
        label="Date of Birth"
        value={formData.dob}
        onChange={(e) => {
          handleChange("dob", new Date(e.target.value));
          setEditMode(true);
        }}
        errors={errors.dob}
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
