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
        <Form action={formAction} layout="vertical">
          <Input type="email" id="email" label="Email" />
          <Input type="password" id="password" label="Password" />
          <Button
            className={styles.loginButton}
            text="Login"
            size="medium"
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
