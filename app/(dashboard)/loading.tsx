"use client";

import LoadingSpinner from "@/shared/components/LoadingSpinner";

export default function Page() {
  return (
    <div className="absolute top-50 left-1/2 transform -translate-x-1/2 flex justify-center">
      <LoadingSpinner />
    </div>
  );
}
