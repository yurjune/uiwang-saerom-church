"use client";

import ContentListView from "@/components/ContentListView/ContentListView";
import type { ArticleEntry } from "@/interface/article";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import { filterByTag } from "@/utils/articles";
import { usePathname, useSearchParams } from "next/navigation";

type MoviesPageProps = {
  articles: ArticleEntry[];
};

const MoviesPage = ({ articles }: MoviesPageProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const bible = searchParams.get("v") ?? undefined;
  const page = searchParams.get("page") ?? "1";
  const currentPage = parseInt(page, 10) || 1;
  const posts = filterByTag(articles, bible);

  const category = CONTENTFUL_CATEGORY.movies;
  const title = category + (bible ? ` - ${bible}` : "");

  const getPageHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  };

  return (
    <ContentListView
      title={title}
      category={category}
      articles={posts}
      currentPage={currentPage}
      getPageHref={getPageHref}
    />
  );
};

export default MoviesPage;
