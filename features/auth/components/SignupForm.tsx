"use client";
import React, { startTransition, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
//Actions
import { signup } from "../lib/actions/signup";
//Styles
import { toastStyle } from "@/shared/styles/toastStyle";
//Components
import Button from "@/shared/components/ui/Button";
import Providers from "./Providers";
import Input from "@/shared/components/ui/Input";
import { FieldError, FieldGroup } from "@/components/ui/field";
//Icons
import { Eye, EyeOff, Mail, SendHorizontal, Lock } from "lucide-react";
//Schemas
import { signupFormSchema } from "../schemas/forms";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  function onSubmit(data: z.infer<typeof signupFormSchema>) {
    startTransition(async () => {
      const result = await signup(data);
      if (result.success) {
        router.push(`/signup/success?email=${data.email}`);
      } else {
        toast.error(`Error: ${result.error}`, toastStyle);
      }
    });
  }

  return (
    <div className="flex flex-col items-center gap-7 p-4">
      <h2>Create Spendie account</h2>
      <p className="max-w-sm text-center">
        Create your account and start managing money with confidence.
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-md">
        <FieldGroup>
          <Input
            {...form.register("email")}
            label="Email"
            id="email"
            type="text"
            placeholder="Enter your email"
            icon={<Mail />}
          />
          {form.formState.errors.email && (
            <FieldError errors={[form.formState.errors.email]} />
          )}
          <Input
            {...form.register("password")}
            label="Password"
            id="password"
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            icon={<Lock />}
            passwordIcon={
              showPassword ? (
                <Eye onClick={() => setShowPassword(false)} />
              ) : (
                <EyeOff onClick={() => setShowPassword(true)} />
              )
            }
          />
          {form.formState.errors.password && (
            <FieldError errors={[form.formState.errors.password]} />
          )}
          <Input
            {...form.register("confirmPassword")}
            label="Confirm Password"
            id="confirmPassword"
            placeholder="Re-enter your password"
            type={showPassword ? "text" : "password"}
            icon={<Lock />}
          />
          <Button
            className="mt-4"
            size="default"
            variant="default"
            type="submit"
            icon={<SendHorizontal />}
            iconPosition="right"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Creating account..."
              : "Create account"}
          </Button>
        </FieldGroup>
      </form>
      <Providers />
    </div>
  );
};

export default SignupForm;
