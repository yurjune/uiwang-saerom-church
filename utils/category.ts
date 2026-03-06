import { categoryMap, CONTENTFUL_CATEGORY } from "@/constants/category";

export const categoryToUrl = (category?: string): string => {
  if (!category) return "/#";
  return categoryMap[category as keyof typeof categoryMap]?.url ?? "/#";
};

export const categoryToContentUrl = (category?: string): string => {
  if (!category) return "/#";
  return categoryMap[category as keyof typeof categoryMap]?.contentUrl ?? "/#";
};

type MoviesQuery = {
  page?: number;
  bible?: string;
};

export const buildMoviesUrl = ({ page, bible }: MoviesQuery = {}): string => {
  const baseUrl = categoryToUrl(CONTENTFUL_CATEGORY.movies);
  const params = new URLSearchParams();

  if (bible) {
    params.set("bible", bible);
  }

  if (typeof page === "number" && Number.isFinite(page) && page > 0) {
    params.set("page", String(page));
  }

  const query = params.toString();
  return query ? `${baseUrl}?${query}` : baseUrl;
};
