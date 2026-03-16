import { useMemo, useState, useEffect } from "react";

export function usePagination<T>(items: T[], itemsPerPage: number) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  const currentItems = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, page, itemsPerPage]);

  // Prevent page overflow if items shrink
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  return {
    page,
    setPage,
    totalPages,
    currentItems,
  };
}
