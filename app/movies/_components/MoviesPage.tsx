"use client";

import ContentListView from "@/components/ContentListView/ContentListView";
import type { ArticleEntry } from "@/interface/article";
import { usePathname, useSearchParams } from "next/navigation";

type MoviesPageProps = {
  articles: ArticleEntry[];
  currentPage: number;
  totalCount: number;
};

const MoviesPage = ({ articles, currentPage, totalCount }: MoviesPageProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getPageHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  };

  return (
    <ContentListView
      articles={articles}
      currentPage={currentPage}
      totalCount={totalCount}
      getPageHref={getPageHref}
    />
  );
};

export default MoviesPage;
