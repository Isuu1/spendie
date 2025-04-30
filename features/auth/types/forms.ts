export type LoginFormState = {
  error: string | null;
  success: boolean;
  data: { email: string | ""; password: string | "" };
  status: number;
  resetKey?: number;
};
