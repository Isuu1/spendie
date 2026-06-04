"use client";

import Button from "./ui/Button";
import { cn } from "../lib/cn";

type ErrorMessageProps = {
  message: string;
  onReload?: () => void;
};

const ErrorMessage = ({ message, onReload }: ErrorMessageProps) => {
  const handleReload = () => {
    if (onReload) {
      onReload();
    } else {
      window.location.reload();
    }
  };

  return (
    <div
      className={cn(
        "w-fit ml-auto mr-auto mt-6 flex flex-col items-center gap-4 text-center p-6",
        "bg-[rgba(255,0,0,0.1)] border-2 border-[rgba(255,0,0,0.3)] rounded-2xl",
      )}
    >
      <h3>{message || "An error occurred."}</h3>
      <p>Try to refresh the page or contact support if problem persists.</p>
      <Button variant="secondary" onClick={handleReload}>
        Reload
      </Button>
    </div>
  );
};

export default ErrorMessage;
