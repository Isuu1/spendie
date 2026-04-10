import { useMemo, useState } from "react";

type SortOption<T> = {
  label: string;
  value: string;
  sortFn: (a: T, b: T) => number;
};

export function useSorting<T>(
  items: T[],
  sortOptions: SortOption<T>[],
  defaultOption: string,
) {
  const [sortOption, setSortOption] = useState<SortOption<T>>(
    sortOptions.find((opt) => opt.value === defaultOption) || sortOptions[0],
  );

  const sortedItems = useMemo(() => {
    return [...items].sort(sortOption.sortFn);
  }, [items, sortOption]);

  const handleSortingChange = (value: string) => {
    const selectedOption =
      sortOptions.find((opt) => opt.value === value) || sortOptions[0];
    setSortOption(selectedOption);
  };

  return { sortedItems, sortOption, handleSortingChange };
}
