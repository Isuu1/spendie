import { StandingOrder } from "./standing-order";

export type UserProfile = {
  id: string;
  email: string;
  username: string;
  avatar: string;
  standing_orders: StandingOrder[];
};
