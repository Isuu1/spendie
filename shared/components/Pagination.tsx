import React from "react";
import { cn } from "../lib/cn";

type PaginationProps = {
  page: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
};

const Pagination = ({ page, onPageChange, totalPages }: PaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        className="bg-card cursor-pointer px-3 py-1 rounded-md disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => onPageChange((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
      >
        Previous
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            className={cn(
              "bg-card cursor-pointer px-3 py-1 rounded-md disabled:cursor-not-allowed disabled:opacity-50",
              page === pageNum && "bg-accent text-white",
            )}
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      </div>
      <button
        className="bg-card cursor-pointer px-3 py-1 rounded-md disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => onPageChange((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
