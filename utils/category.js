import { categoryMap } from "@/constants/category";

export const categoryToUrl = (category) => {
  return categoryMap[category]?.url ?? "/#";
};

export const categoryToContentUrl = (category) => {
  return categoryMap[category]?.contentUrl ?? "/#";
};
