"use client";

import React, { startTransition } from "react";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
//Components
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
import DateInput from "@/shared/components/ui/DateInput";
import { Field, FieldGroup } from "@/components/ui/field";
import InputError from "@/shared/components/ui/InputError";
//Types
import { UserProfile } from "@/features/user/types/user";
//Actions
import { changeUserDetails } from "@/features/user/lib/actions/changeUserDetails";
//Icons
import { Mail, User } from "lucide-react";
//Types
import { accountDetailsSchema } from "@/features/user/schemas/accountDetailsSchema";
//Styles
import { toastStyle } from "@/shared/styles/toastStyle";

type ChangeDetailsFormProps = {
  user: UserProfile;
};

const ChangeDetailsForm = ({ user }: ChangeDetailsFormProps) => {
  const form = useForm<z.infer<typeof accountDetailsSchema>>({
    resolver: zodResolver(accountDetailsSchema),
    defaultValues: {
      name: user.name,
      surname: user.surname,
      dob: dayjs(user.dob).toDate(),
      email: user.email,
    },
    mode: "onChange",
  });

  function onSubmit(data: z.infer<typeof accountDetailsSchema>) {
    startTransition(async () => {
      const result = await changeUserDetails(data);
      if (result.success) {
        toast.success("Details updated!", toastStyle);
        form.reset(data); // Reset form with new values
      } else {
        if (result.error === "Email already in use") {
          form.setError("email", { message: result.error });
        } else {
          toast.error(result.error || "Failed to update details", toastStyle);
        }
      }
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-lg">
      <FieldGroup>
        <Field orientation="horizontal" className="flex items-start">
          <div className="flex flex-col gap-3 flex-1">
            <Input
              {...form.register("name")}
              id="name"
              type="text"
              label="Name"
              icon={<User />}
              error={form.formState.errors.name}
            />
            <InputError error={form.formState.errors.name} />
          </div>
          <div className="flex flex-col gap-3 flex-1">
            <Input
              {...form.register("surname")}
              id="surname"
              type="text"
              label="Surname"
              icon={<User />}
              error={form.formState.errors.surname}
            />
            <InputError error={form.formState.errors.surname} />
          </div>
        </Field>
        <Field orientation="horizontal" className="flex items-start">
          <Controller
            control={form.control}
            name="dob"
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-3">
                <DateInput
                  {...field}
                  id="dob"
                  label="Date of Birth"
                  disabled={{ after: new Date() }}
                  error={fieldState.error}
                />
                <InputError error={fieldState.error} />
              </div>
            )}
          />
          <div className="flex flex-col gap-3 flex-1">
            <Input
              {...form.register("email")}
              id="email"
              type="email"
              label="Email"
              icon={<Mail />}
              error={form.formState.errors.email}
            />
            <InputError error={form.formState.errors.email} />
          </div>
        </Field>
        <div className="flex justify-end gap-2 mt-4">
          {form.formState.isDirty && (
            <Button
              variant="secondary"
              type="button"
              size="sm"
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
          )}

          <Button
            variant="default"
            type="submit"
            size="sm"
            disabled={!form.formState.isDirty || form.formState.isSubmitting}
          >
            Save
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default ChangeDetailsForm;
