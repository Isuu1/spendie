import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";
//Animations
import { motion } from "motion/react";

const switcherVariants = cva(
  "flex items-center justify-between gap-2 select-none",
  {
    variants: {
      labelPosition: {
        left: "flex-row-reverse",
        right: "flex-row",
      },
      size: {
        sm: "w-7",
        default: "w-9",
      },
    },
  },
);

type SwitcherProps = {
  value: boolean;
  onChange: () => void;
  label?: string;
  labelPosition?: "left" | "right";
  size?: "sm" | "default";
  isPending?: boolean;
};

const Switcher = ({
  value,
  onChange,
  label,
  labelPosition = "right",
  size = "default",
  isPending = false,
}: SwitcherProps) => {
  return (
    <div className={cn(switcherVariants({ labelPosition }))}>
      <span
        className={cn(
          switcherVariants({ size }),
          "cursor-pointer rounded-lg bg-bg-surface p-0.5",
          isPending && "pointer-events-none opacity-50",
          !value ? "bg-accent" : "bg-gray-300",
          value && "bg-gray-300",
        )}
        onClick={() => onChange()}
      >
        <motion.span
          className="w-[50%] h-full rounded-full aspect-square block bg-white"
          initial={false}
          animate={{
            x: value ? "0%" : "100%",
          }}
        />
      </span>
      {label && <span className="whitespace-nowrap">{label}</span>}
    </div>
  );
};

export default Switcher;
