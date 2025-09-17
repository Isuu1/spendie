"use client";

import React, { useRef, useState } from "react";
//Components
import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
//Types
import { UserProfile } from "@/features/user/types/user";

import { z } from "zod";
import { useForm } from "@/shared/hooks/useForm";

const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  //.startsWith("aaa"),
  email: z.string().email(),
});

// Build a type where each schema field has string[]
// type SchemaErrors<T extends z.ZodTypeAny> = {
//   [K in keyof z.infer<T>]: string[];
// };

//type UserFormErrors = SchemaErrors<typeof userSchema>;

interface ChangeDetailsFormProps {
  user: UserProfile;
}

const ChangeDetailsForm: React.FC<ChangeDetailsFormProps> = ({ user }) => {
  const [editMode, setEditMode] = useState(false);
  // const [formData, setFormData] = useState({
  //   username: user.username,
  //   email: user.email,
  // });
  // const [errors, setErrors] = useState<UserFormErrors>(() => {
  //   // initialize with empty arrays for each field
  //   const fields = Object.keys(userSchema.shape) as (keyof UserFormErrors)[];
  //   return fields.reduce((acc, key) => {
  //     acc[key] = [];
  //     return acc;
  //   }, {} as UserFormErrors);
  // });

  const { formData, errors, handleChange, resetForm } = useForm(userSchema, {
    username: user.username,
    email: user.email,
  });

  console.log(formData);

  const formRef = useRef<HTMLFormElement>(null);

  const handleCloseForm = () => {
    setEditMode(false);
    resetForm();
    //setErrors({ username: null, email: null });
    // setErrors(
    //   Object.keys(userSchema.shape).reduce(
    //     (acc, key) => ({ ...acc, [key]: [] as string[] }),
    //     {} as UserFormErrors
    //   )
    // );
    // if (formRef.current) {
    //   formRef.current.reset();
    // }
  };

  // const handleEditFields = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { id, value } = e.target;
  //   const updatedFormData = { ...formData, [id]: value };
  //   setFormData(updatedFormData);
  //   const result = userSchema.safeParse(updatedFormData);
  //   console.log(result);
  //   if (!result.success) {
  //     const fieldErrors = Object.keys(userSchema.shape).reduce(
  //       (acc, key) => ({ ...acc, [key]: [] as string[] }),
  //       {} as UserFormErrors
  //     );

  //     result.error.errors.forEach((err) => {
  //       const field = err.path[0] as keyof UserFormErrors;
  //       if (field in fieldErrors) {
  //         fieldErrors[field].push(err.message);
  //       }
  //     });

  //     setErrors(fieldErrors);
  //   } else {
  //     setErrors(
  //       Object.keys(userSchema.shape).reduce(
  //         (acc, key) => ({ ...acc, [key]: [] as string[] }),
  //         {} as UserFormErrors
  //       )
  //     );
  //   }
  //   setEditMode(true);
  // };

  console.log("Errors:", errors);

  return (
    <Form layout="vertical" ref={formRef}>
      <Input
        layout="vertical"
        id="username"
        type="text"
        label="Username"
        defaultValue={user.username}
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
        defaultValue={user.email}
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
