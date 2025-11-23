"use client";
import React, { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
//Types
import { SignupFormState } from "../types/forms";
//Actions
import { signup } from "../lib/actions/signup";
//Styles
import styles from "./SignupForm.module.scss";
import { toastStyle } from "@/shared/styles/toastStyle";
//Components
import Button from "@/shared/components/ui/Button";
import Providers from "./Providers";
import Form from "@/shared/components/ui/Form";
import Input from "@/shared/components/ui/Input";
//Icons
import { FiLogIn } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
//Hooks
import { useForm } from "@/shared/hooks/useForm";
//Schemas
import { signupFormSchema } from "../schemas/forms";

const initialState: SignupFormState = {
  error: null,
  success: false,
  data: { email: "", password: "", confirmPassword: "" },
  status: 0,
  resetKey: Date.now(),
};

const SignupForm = () => {
  const [state, formAction, isPending] = useActionState(signup, initialState);
  const [showPassword, setShowPassword] = useState(false);
  console.log("LoginForm state", state);

  const { formData, errors, handleChange, validateForm } = useForm(
    signupFormSchema,
    {
      email: "",
      password: "",
      confirmPassword: "",
    }
  );

  const router = useRouter();

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
    if (state.success) {
      router.push(`/signup/success?email=${formData.email}`);
    }
  }, [state, router, formData.email]);

  return (
    <div className={styles.signupForm}>
      <p className={styles.subtitle}>
        Create your account and start managing money with confidence.
      </p>
      <Form
        layout="vertical"
        action={formAction}
        onSubmit={handleValidationBeforeSubmit}
      >
        <Input
          label="Email"
          id="email"
          type="text"
          placeholder="Enter your email"
          icon={<MdEmail />}
          errors={errors.email}
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <Input
          label="Password"
          id="password"
          placeholder="Enter your password"
          type={showPassword ? "text" : "password"}
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
        <Input
          label="Confirm Password"
          id="confirmPassword"
          placeholder="Re-enter your password"
          type={showPassword ? "text" : "password"}
          icon={<RiLockPasswordFill />}
          errors={errors.confirmPassword}
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
        />
        <Button
          className={styles.loginButton}
          text={isPending ? "Creating account..." : "Create account"}
          size="large"
          variant="primary"
          type="submit"
          icon={<FiLogIn />}
          iconPosition="left"
          disabled={isPending}
        />
        <Providers />
      </Form>
    </div>
  );
};

export default SignupForm;
