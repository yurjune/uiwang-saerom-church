"use client";

import ContentListView from "@/components/ContentListView/ContentListView";
import type { ArticleEntry } from "@/interface/article";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import { usePathname } from "next/navigation";

type MoviesPageProps = {
  articles: ArticleEntry[];
  currentPage: number;
  totalCount: number;
  bible?: string;
};

const MoviesPage = ({
  articles,
  currentPage,
  totalCount,
  bible,
}: MoviesPageProps) => {
  const pathname = usePathname();

  const category = CONTENTFUL_CATEGORY.movies;
  const title = category + (bible ? ` - ${bible}` : "");

  const getPageHref = (page: number) => {
    const params = new URLSearchParams();
    if (bible) {
      params.set("v", bible);
    }
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  };

  return (
    <ContentListView
      title={title}
      category={category}
      articles={articles}
      currentPage={currentPage}
      totalCount={totalCount}
      getPageHref={getPageHref}
    />
  );
};

export default MoviesPage;
