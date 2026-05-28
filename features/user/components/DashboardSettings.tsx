"use client";

import DashboardPanelsMenu from "@/features/dashboard/components/DashboardPanelsMenu";

const DashboardSettings = () => {
  return (
    <div className="bg-card p-6 rounded-2xl grid grid-cols-[1fr_1.5fr] gap-12">
      <div className="flex flex-col gap-3">
        <p className="text-lg font-bold">Dashboard panels</p>
        <p>Manage which panels appear on your dashboard.</p>
      </div>
      <DashboardPanelsMenu />
    </div>
  );
};

export default DashboardSettings;
