import React from "react";
import { cn } from "@/shared/lib/cn";

type DashboardLayoutWrapperProps = {
  children: React.ReactNode;
  header: React.ReactNode;
  sidebar: React.ReactNode;
};

const DashboardLayoutWrapper: React.FC<DashboardLayoutWrapperProps> = ({
  children,
  header,
  sidebar,
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden h-full grid",
        "grid-rows-[auto_1fr] grid-cols-[minmax(100px,auto)_1fr]",
        '[grid-template-areas:"sidebar_header""sidebar_main"]',
        "max-sm:grid-cols-1",
      )}
    >
      {header}
      {sidebar}
      <div
        className={cn(
          "bg-background relative grid-area-main h-full w-full flex flex-col gap-2 rounded-lg",
          "overflow-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]",
          "box-border z-1 relative [grid-area:main] h-full",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayoutWrapper;
