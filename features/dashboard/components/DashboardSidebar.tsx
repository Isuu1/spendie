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
        "group box-border z-47 overflow-hidden text-primary",
        "absolute w-full h-full px-3 transition-width duration-150 linear",
        !collapsed && "relative w-62.5",
        "hover:w-62.5",
        "max-sm:hidden",
      )}
    >
      <div className="bg-card p-4 rounded-2xl w-full h-full">
        <DashboardSidebarContent collapsed={collapsed} />
      </div>
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
