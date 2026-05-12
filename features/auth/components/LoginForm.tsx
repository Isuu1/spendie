"use client";
import React, { startTransition, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
//Actions
import { login } from "../lib/actions/login";
//Components
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
import Providers from "./Providers";
import { FieldGroup } from "@/components/ui/field";
import InputError from "@/shared/components/ui/InputError";
//Styles
import { toastStyle } from "@/shared/styles/toastStyle";
//Schemas
import { loginFormSchema } from "../schemas/forms";
//Icons
import { Mail, Lock, SendHorizontal, Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  function onSubmit(data: z.infer<typeof loginFormSchema>) {
    startTransition(async () => {
      const result = await login(data);
      if (result.success) {
        toast.success(
          "Logged in successfully! Redirecting to dashboard...",
          toastStyle,
        );
        router.push("/dashboard");
      } else {
        toast.error(`Error: ${result.error}`, toastStyle);
      }
    });
  }

  return (
    <div className="flex flex-col items-center gap-7 p-4">
      <h2>Welcome back to Spendie</h2>
      <p className="max-w-sm text-center leading-6">
        Manage your finances, track payments, and pick up right where you left
        off.
      </p>
      <form className="w-md" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Input
            {...form.register("email")}
            type="email"
            id="email"
            label="Email"
            placeholder="Enter your email"
            icon={<Mail />}
            error={form.formState.errors.email}
          />
          <InputError error={form.formState.errors.email} />
          <Input
            {...form.register("password")}
            type={showPassword ? "text" : "password"}
            id="password"
            label="Password"
            placeholder="Enter your password"
            icon={<Lock />}
            passwordIcon={
              showPassword ? (
                <Eye onClick={() => setShowPassword(false)} />
              ) : (
                <EyeOff onClick={() => setShowPassword(true)} />
              )
            }
            error={form.formState.errors.password}
          />
          <InputError error={form.formState.errors.password} />
          <Button
            className="mt-4"
            size="default"
            variant="default"
            type="submit"
            icon={<SendHorizontal />}
            iconPosition="right"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </FieldGroup>
      </form>
      <Providers />
    </div>
  );
};

export default LoginForm;
