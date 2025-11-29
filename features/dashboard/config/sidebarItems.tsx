//Icons
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoWallet } from "react-icons/io5";
import { FaCalculator } from "react-icons/fa6";
import { FaRepeat } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";

export const sidebarItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <TbLayoutDashboardFilled />,
  },
  { name: "Transactions", href: "/transactions", icon: <IoWallet /> },
  { name: "Budget planner", href: "/budget-planner", icon: <FaCalculator /> },
  {
    name: "Recurring payments",
    href: "/recurring-payments",
    icon: <FaRepeat />,
  },
  { name: "Settings", href: "/user/account-details", icon: <IoSettings /> },
];
