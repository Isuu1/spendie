export type LoginFormState = {
  error: string | null;
  success: boolean;
  data: { email: string | ""; password: string | "" } | null;
  status: number;
  resetKey?: number;
};

export type SignupFormState = {
  error: string | null;
  success: boolean;
  data: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  };
  status: number;
  resetKey?: number;
};
