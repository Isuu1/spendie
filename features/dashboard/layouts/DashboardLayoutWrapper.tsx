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
        "relative overflow-hidden h-full grid bg-background",
        "grid-rows-[auto_1fr] grid-cols-[minmax(65px,auto)_1fr]",
        '[grid-template-areas:"sidebar_header""sidebar_main"]',
        "max-sm:grid-cols-1",
      )}
    >
      {header}
      {sidebar}
      <div
        className={cn(
          "relative grid-area-main px-5 h-full w-full flex flex-col gap-5 rounded-lg",
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
