"use client";
import React, { useActionState } from "react";
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

const initialState: LoginFormState = {
  error: null,
  success: false,
  data: { email: "", password: "" },
  status: 0,
  resetKey: Date.now(),
};

const LoginForm = () => {
  const [state, formAction] = useActionState(login, initialState);
  console.log("LoginForm state", state);
  return (
    <div className={styles.loginFormContainer}>
      <div className={styles.loginForm}>
        <h1 className={styles.logo}>Spendie.</h1>
        <h3 className={styles.subtitle}>
          Manage your finances, track payments, and pick up right where you left
          off.
        </h3>
        <Form action={formAction} layout="vertical">
          <Input type="email" id="email" label="Email" icon={<MdEmail />} />
          <Input
            type="password"
            id="password"
            label="Password"
            icon={<RiLockPasswordFill />}
          />
          <Button
            className={styles.loginButton}
            text="Login"
            size="large"
            variant="primary"
            type="submit"
            icon={<IoSend />}
          />
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
