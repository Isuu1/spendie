import React, { useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";

type AnimatedTabsProps = {
  type: "income" | "expense";
  toggleDetails?: (type: "income" | "expense" | null) => void;
};

const AnimatedTabs = ({ type, toggleDetails }: AnimatedTabsProps) => {
  const incomeTabRef = useRef<HTMLSpanElement>(null);
  const expenseTabRef = useRef<HTMLSpanElement>(null);

  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    x: 0,
  });

  useLayoutEffect(() => {
    const activeTab =
      type === "income" ? incomeTabRef.current : expenseTabRef.current;

    if (!activeTab) return;

    setIndicatorStyle({
      width: activeTab.offsetWidth,
      x: activeTab.offsetLeft,
    });
  }, [type]);

  return (
    <div className="relative flex bg-card rounded-lg">
      <motion.span
        className="z-1 absolute top-0 bottom-0 left-0 h-full w-[50%] bg-accent rounded-lg"
        animate={{
          width: indicatorStyle.width,
          x: indicatorStyle.x,
        }}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      ></motion.span>
      <span
        ref={incomeTabRef}
        className="z-2 relative cursor-pointer px-3 py-1 rounded-lg"
        onClick={() => toggleDetails?.("income")}
      >
        Income
      </span>
      <span
        ref={expenseTabRef}
        className="z-2 relative cursor-pointer px-3 py-1 rounded-lg"
        onClick={() => toggleDetails?.("expense")}
      >
        Expense
      </span>
    </div>
  );
};

export default AnimatedTabs;
