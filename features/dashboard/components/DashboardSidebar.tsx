"use client";
import { cn } from "@/shared/lib/cn";
//Components
import DashboardSidebarContent from "./DashboardSidebarContent";
import Switcher from "@/shared/components/ui/Switcher";
//Hooks
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useLocalStorage("sidebar-collapsed", false);

  const handleSidebarToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={cn(
        "group overflow-hidden text-secondary flex flex-col",
        "box-border z-47 absolute w-16.25 transition-width duration-150 linear [grid-area:sidebar] p-5 h-full flex flex-col gap-8",
        "bg-card",
        !collapsed && "relative w-62.5",
        "hover:w-62.5",
        "max-sm:hidden",
      )}
    >
      <DashboardSidebarContent collapsed={collapsed} />
      <div
        className={cn(
          "opacity-0 absolute top-1/2 right-0",
          "group-hover:opacity-100",
          !collapsed && "opacity-100",
        )}
      >
        <Switcher value={collapsed} onChange={handleSidebarToggle} />
      </div>
    </div>
  );
};

export default DashboardSidebar;
