//Icons
import {
  Calculator,
  Landmark,
  LayoutDashboard,
  Repeat,
  Settings,
  Wallet,
} from "lucide-react";

export const sidebarItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  { name: "Accounts", href: "/accounts", icon: <Landmark size={20} /> },
  { name: "Transactions", href: "/transactions", icon: <Wallet size={20} /> },
  {
    name: "Budget planner",
    href: "/budget-planner",
    icon: <Calculator size={20} />,
  },
  {
    name: "Recurring payments",
    href: "/recurring-payments",
    icon: <Repeat size={20} />,
  },
  {
    name: "Settings",
    href: "/settings/user/account-details",
    icon: <Settings size={20} />,
  },
];
