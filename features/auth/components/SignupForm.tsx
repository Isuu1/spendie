"use client";
import React, { useActionState, useState } from "react";
//Types
import { SignupFormState } from "../types/forms";
//Actions
import { signup } from "../lib/actions/signup";
//Styles
import styles from "./SignupForm.module.scss";
//Components
import Button from "@/shared/components/ui/Button";
import Providers from "./Providers";
import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
//Icons
import { IoSend } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const initialState: SignupFormState = {
  error: null,
  success: false,
  data: { email: "", username: "", password: "", confirmPassword: "" },
  status: 0,
  resetKey: Date.now(),
};

const SignupForm = () => {
  const [state, formAction, isPending] = useActionState(signup, initialState);
  const [showPassword, setShowPassword] = useState(false);
  console.log("LoginForm state", state);
  return (
    <div className={styles.signupForm}>
      <h1 className={styles.logo}>Spendie.</h1>
      <h3 className={styles.subtitle}>
        Manage your finances, track payments, and pick up right where you left
        off.
      </h3>
      <Form layout="vertical" action={formAction}>
        <Input label="Email" id="email" type="text" icon={<MdEmail />} />
        <Input
          label="Username"
          id="username"
          type="text"
          icon={<FaUserAlt />}
        />
        <Input
          label="Password"
          id="password"
          type={showPassword ? "text" : "password"}
          icon={<RiLockPasswordFill />}
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
        <Input
          label="Confirm Password"
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          icon={<RiLockPasswordFill />}
        />
        <Button
          className={styles.loginButton}
          text={isPending ? "Creating account..." : "Create account"}
          size="large"
          variant="primary"
          type="submit"
          icon={<IoSend />}
          disabled={isPending}
        />
        <Providers />
      </Form>
    </div>
  );
};

export default SignupForm;
