import { DashboardLayoutItem } from "@/features/dashboard/components/Dashboard";

export type UserProfile = {
  createdAt: string;
  id: string;
  email: string;
  name: string;
  surname: string;
  username: string;
  dob: string;
  avatar: string;
};

export type UserSettings = {
  id: string;
  user_id: string;
  dashboard_layout: DashboardLayoutItem[];
  currency: string;
};
