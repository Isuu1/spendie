"use client";
import React, { useActionState, useEffect, useState } from "react";
import { LoginFormState } from "../types/forms";
import { login } from "../lib/actions/login";
import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
//Styles
import styles from "./LoginForm.module.scss";
import { IoSend } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useForm } from "@/shared/hooks/useForm";
import { loginFormSchema } from "../schemas/forms";
import toast from "react-hot-toast";
import { toastStyle } from "@/shared/styles/toastStyle";
import Providers from "./Providers";
//Icons
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const initialState: LoginFormState = {
  error: null,
  success: false,
  data: null,
  status: 0,
  resetKey: Date.now(),
};

const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(login, initialState);
  const [showPassword, setShowPassword] = useState(false);

  const { formData, errors, handleChange, validateForm } = useForm(
    loginFormSchema,
    {
      email: "",
      password: "",
    }
  );
  console.log("errors", errors);
  console.log("LoginForm state", state);

  const handleValidationBeforeSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    //This runs before server action to validate all fields on client side
    const isValid = validateForm(formData);
    console.log("data before submit", formData, isValid);
    if (!isValid) {
      //Stop form submission if invalid
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (state.error) {
      toast.error(`Error: ${state.error}`, toastStyle);
    }
  }, [state]);

  return (
    <div className={styles.loginFormContainer}>
      <div className={styles.loginForm}>
        <h1 className={styles.logo}>Spendie.</h1>
        <h3 className={styles.subtitle}>
          Manage your finances, track payments, and pick up right where you left
          off.
        </h3>
        <Form
          action={formAction}
          layout="vertical"
          onSubmit={handleValidationBeforeSubmit}
        >
          <Input
            type="email"
            id="email"
            label="Email"
            icon={<MdEmail />}
            errors={errors.email}
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            label="Password"
            icon={<RiLockPasswordFill />}
            errors={errors.password}
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            passwordIcon={
              showPassword ? (
                <FaEyeSlash
                  onClick={() => setShowPassword(false)}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <FaEye
                  onClick={() => setShowPassword(true)}
                  style={{ cursor: "pointer" }}
                />
              )
            }
          />
          <Button
            className={styles.loginButton}
            text={isPending ? "Logging in..." : "Login"}
            size="large"
            variant="primary"
            type="submit"
            icon={<IoSend />}
            disabled={isPending}
          />
          <Providers />
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
