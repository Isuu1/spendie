import { cn } from "@/shared/lib/cn";
import { OctagonAlert } from "lucide-react";
import type { FieldError } from "react-hook-form";

type InputErrorProps = {
  error?: FieldError;
  className?: string;
};

const InputError = ({ error, className }: InputErrorProps) => {
  if (!error) return null;

  return (
    <div
      className={cn(
        className,
        "flex items-start gap-1 text-sm text-red-600! w-fit",
        "animate-in fade-in duration-300",
      )}
    >
      <OctagonAlert size={18} className="shrink-0" />
      <span className="leading-tight text-red-600!">{error?.message}</span>
    </div>
  );
};

export default InputError;
