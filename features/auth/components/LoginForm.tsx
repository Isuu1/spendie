"use client";
import React, { useActionState } from "react";
import { LoginFormState } from "../types/forms";
import { login } from "../lib/actions/login";

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
    <form action={formAction}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
