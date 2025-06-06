import { StandingOrder } from "./recurring-payment";

export type UserProfile = {
  id: string;
  email: string;
  username: string;
  avatar: string;
  standing_orders: StandingOrder[];
};
