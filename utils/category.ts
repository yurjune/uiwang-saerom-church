import { categoryMap } from "@/constants/category";

export const categoryToUrl = (category?: string): string => {
  if (!category) return "/#";
  return categoryMap[category as keyof typeof categoryMap]?.url ?? "/#";
};

export const categoryToContentUrl = (category?: string): string => {
  if (!category) return "/#";
  return categoryMap[category as keyof typeof categoryMap]?.contentUrl ?? "/#";
};
