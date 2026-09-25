import { cacheLife, cacheTag } from "next/cache";
import type { ArticleSummary } from "@/lib/contentful/article";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import { getArticles } from "@/lib/contentful/getArticles";
import { THIRTY_DAYS_IN_SECONDS } from "@/lib/contentful/constants";

export type GetNewsArticlesResult = {
  articles: ArticleSummary[];
};

export async function getNewsArticles(): Promise<GetNewsArticlesResult> {
  "use cache";
  cacheLife({ revalidate: THIRTY_DAYS_IN_SECONDS });
  cacheTag("articles");

  const { articles } = await getArticles({
    category: CONTENTFUL_CATEGORY.news,
  });

  return {
    articles,
  };
}
