import { cacheLife, cacheTag } from "next/cache";
import type { ArticleDetail, ArticleSummary } from "@/lib/contentful/article";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import { getArticleById } from "@/lib/contentful/getArticleById";
import { getArticles } from "@/lib/contentful/getArticles";
import { THIRTY_DAYS_IN_SECONDS } from "@/lib/contentful/constants";

export type GetNewsArticlesResult = {
  articles: ArticleSummary[];
  firstArticle: ArticleDetail | null;
};

export async function getNewsArticles(): Promise<GetNewsArticlesResult> {
  "use cache";
  cacheLife({ revalidate: THIRTY_DAYS_IN_SECONDS });
  cacheTag("articles");

  const { articles } = await getArticles({
    category: CONTENTFUL_CATEGORY.news,
  });
  const firstArticle = articles[0]
    ? await getArticleById(articles[0].sys.id)
    : undefined;

  return {
    articles,
    firstArticle: firstArticle ?? null,
  };
}
