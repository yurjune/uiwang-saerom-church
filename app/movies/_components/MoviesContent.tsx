import ContentListView from "@/components/ContentListView/ContentListView";
import { postNumberPerOnePage } from "@/constants/pagination";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import { getArticles } from "@/lib/contentful";
import type { MoviesPageProps } from "../types";

function getCurrentPage(value?: string) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

const MoviesContent = async ({ searchParams }: MoviesPageProps) => {
  const resolvedSearchParams = await searchParams;
  const bible = resolvedSearchParams.bible;
  const currentPage = getCurrentPage(resolvedSearchParams.page);
  const limit = postNumberPerOnePage;
  const skip = (currentPage - 1) * limit;

  const { articles, totalCount } = await getArticles({
    category: CONTENTFUL_CATEGORY.movies,
    tag: bible,
    limit,
    skip,
  });

  const createMoviesPageHref = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    if (bible) {
      params.set("bible", bible);
    }
    return `/movies?${params.toString()}`;
  };

  return (
    <ContentListView
      articles={articles}
      currentPage={currentPage}
      totalCount={totalCount}
      createPageHref={createMoviesPageHref}
    />
  );
};

export default MoviesContent;
