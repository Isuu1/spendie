"use client";

import { useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();

  return (
    <span
      className="w-fit cursor-pointer hover:text-accent transition-colors duration-200"
      onClick={() => router.back()}
    >
      <MoveLeft size={30} />
    </span>
  );
};

export default BackButton;
