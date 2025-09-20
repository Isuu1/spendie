import { UserProfile } from "./user";

export type ChangeDetailsFormState = {
  success: boolean;
  error: string | null;
  user: UserProfile | null;
  //fieldErrors?: Record<string, string[]>;
};
