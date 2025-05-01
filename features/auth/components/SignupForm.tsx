"use client";
import React, { useActionState } from "react";
import { SignupFormState } from "../types/forms";
import { signup } from "../lib/actions/signup";

const initialState: SignupFormState = {
  error: null,
  success: false,
  data: { email: "", username: "", password: "", confirmPassword: "" },
  status: 0,
  resetKey: Date.now(),
};

const SignupForm = () => {
  const [state, formAction] = useActionState(signup, initialState);
  console.log("LoginForm state", state);
  return (
    <form action={formAction}>
      <div>
        <label htmlFor="username">Email</label>
        <input type="text" id="email" name="email" />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
      </div>
      <div>
        <label htmlFor="password">Confirm password</label>
        <input type="password" id="confirmPassword" name="confirmPassword" />
      </div>
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupForm;
