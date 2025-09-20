"use client";

import React, { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
//Components
import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
//Types
import { UserProfile } from "@/features/user/types/user";
//Hooks
import { useForm } from "@/shared/hooks/useForm";
import { changeUserDetails } from "@/features/user/actions/changeUserDetails";
//Icons
import { FaUser } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
//Types
import { ChangeDetailsFormState } from "@/features/user/types/forms";
import { accountDetailsSchema } from "@/features/user/schemas/forms";
//Styles
import { toastStyle } from "@/shared/styles/toastStyle";

interface ChangeDetailsFormProps {
  user: UserProfile;
}

const initialFormState: ChangeDetailsFormState = {
  success: false,
  error: "",
  user: null,
  //fieldErrors: {},
};

const ChangeDetailsForm: React.FC<ChangeDetailsFormProps> = ({ user }) => {
  const [editMode, setEditMode] = useState(false);

  const [state, formAction, isPending] = useActionState(
    changeUserDetails,
    initialFormState
  );

  const { formData, errors, handleChange, resetForm } = useForm(
    accountDetailsSchema,
    {
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

  useEffect(() => {
    if (state && state.success) {
      setEditMode(false);
      toast.success("Details updated successfully!", toastStyle);
    }
    if (state && state.error) {
      toast.error(`Error: ${state.error}`, toastStyle);
    }
  }, [state]);

  return (
    <Form layout="vertical" action={formAction}>
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
        icon={<FaUser />}
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
        icon={<FaUser />}
      />
      <Input
        layout="vertical"
        id="dob"
        type="date"
        label="Date of Birth"
        value={formData.dob}
        onChange={(e) => {
          handleChange("dob", e.target.value);
          setEditMode(true);
        }}
        errors={errors.dob}
        icon={<BsCalendarDateFill />}
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
        icon={<MdEmail />}
      />
      <div style={{ display: "flex", gap: "1rem", marginLeft: "auto" }}>
        {editMode && (
          <Button
            text="Cancel"
            variant="secondary"
            type="button"
            size="medium"
            onClick={() => handleCloseForm()}
          />
        )}
        <Button
          text={isPending ? "Saving..." : "Save Changes"}
          variant="primary"
          type="submit"
          size="medium"
          disabled={
            !editMode ||
            Object.values(errors).some((errArr) => errArr.length > 0) ||
            isPending
          }
        />
      </div>
    </Form>
  );
};

export default ChangeDetailsForm;
