"use client";

import LoadingSpinner from "@/shared/components/LoadingSpinner";

export default function Page() {
  return (
    <div
      style={{
        position: "absolute",
        top: "200px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <LoadingSpinner />
    </div>
  );
}
