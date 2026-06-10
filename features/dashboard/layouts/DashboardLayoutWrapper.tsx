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
        "grid-cols-[minmax(100px,auto)_1fr] grid-rows-[auto_1fr]",
      )}
    >
      <aside className="relative row-start-2 col-start-1 h-full">
        {sidebar}
      </aside>
      {header}
      <main
        className={cn(
          "bg-background relative h-full w-full flex flex-col gap-2 rounded-lg",
          "overflow-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]",
          "box-border z-1 relative h-full pr-2",
        )}
      >
        {children}
      </main>
      {/* <div className="bg-card">Recent activities</div> */}
    </div>
  );
};

export default DashboardLayoutWrapper;
