"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();

  return (
    <div
      className="flex gap-2 items-center w-fit cursor-pointer hover:text-accent transition-colors duration-200 mb-4"
      onClick={() => router.back()}
    >
      <ChevronLeft size={30} className="p-0 m-0" />
    </div>
  );
};

export default BackButton;
