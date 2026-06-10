import { categoryIcons } from "../../config/categoryIcons";

export function getCategoryIcon(category: string) {
  if (!category) return null;

  return categoryIcons[category as keyof typeof categoryIcons] ?? null;
}
