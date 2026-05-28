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
    match: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Accounts",
    href: "/accounts",
    match: "/accounts",
    icon: <Landmark size={20} />,
  },
  {
    name: "Transactions",
    href: "/transactions",
    match: "/transactions",
    icon: <Wallet size={20} />,
  },
  {
    name: "Budget planner",
    href: "/budget-planner",
    match: "/budget-planner",
    icon: <Calculator size={20} />,
  },
  {
    name: "Recurring payments",
    href: "/recurring-payments",
    match: "/recurring-payments",
    icon: <Repeat size={20} />,
  },
  {
    name: "Settings",
    href: "/settings/account-details",
    match: "/settings",
    icon: <Settings size={20} />,
  },
];
