"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//Components
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
import { Field, FieldGroup } from "@/components/ui/field";
//Types
import { UserProfile } from "@/features/user/types/user";

const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  //Compare passwords
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // attach error specifically to confirmPassword
  });

type ChangePasswordFormProps = {
  user: UserProfile;
};

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = () => {
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  return (
    <form className="w-full">
      <FieldGroup>
        <Field orientation="horizontal">
          <Input
            {...form.register("newPassword")}
            id="newPassword"
            type="text"
            label="New password"
          />
          <Input
            {...form.register("confirmPassword")}
            id="confirmPassword"
            type="email"
            label="Confirm password"
          />
        </Field>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="default"
            type="submit"
            size="default"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            Change Password
          </Button>
          {form.formState.isDirty && (
            <Button
              variant="secondary"
              type="button"
              size="default"
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
          )}
        </div>
      </FieldGroup>
    </form>
  );
};

export default ChangePasswordForm;
