import React from "react";
import Button from "./ui/Button";
import { Table } from "@tanstack/react-table";

type TablePaginationProps<TData> = {
  table: Table<TData>;
};

const TablePagination = <TData,>({ table }: TablePaginationProps<TData>) => {
  const renderPages = () => {
    const totalPages = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex + 1;
    const visiblePages = 5;

    const startPage =
      Math.floor((currentPage - 1) / (visiblePages - 1)) * (visiblePages - 1) +
      1;

    const endPage = Math.min(startPage + visiblePages - 1, totalPages);

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => {
      const page = startPage + i;

      return (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "ghost"}
          size="sm"
          onClick={() => table.setPageIndex(page - 1)}
        >
          {page}
        </Button>
      );
    });
  };

  return (
    <div className="flex items-center justify-start space-x-2 py-4">
      <Button
        className="bg-background"
        variant="secondary"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      {renderPages()}
      <Button
        className="bg-background"
        variant="secondary"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  );
};

export default TablePagination;
