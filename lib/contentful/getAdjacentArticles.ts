import { cacheLife, cacheTag } from "next/cache";
import type {
  AdjacentArticleSummary,
  ArticleEntry,
  ArticleSkeleton,
} from "@/interface/article";
import { THIRTY_DAYS_IN_SECONDS } from "@/lib/contentful/constants";
import { client } from "@/lib/contentful/client";
import { getArticleCategoryTag } from "@/lib/contentful/tags";
import { toAdjacentArticleSummary } from "@/lib/contentful/transformers";

export type GetAdjacentArticlesOptions = {
  category?: string;
  date: ArticleEntry["fields"]["date"];
};

export type GetAdjacentArticlesResult = {
  prevArticle?: AdjacentArticleSummary;
  nextArticle?: AdjacentArticleSummary;
};

export async function getAdjacentArticles(
  options: GetAdjacentArticlesOptions,
): Promise<GetAdjacentArticlesResult> {
  "use cache";
  cacheLife({ revalidate: THIRTY_DAYS_IN_SECONDS });
  cacheTag("articles");

  const { category, date } = options;
  cacheTag(getArticleCategoryTag(category));

  const categoryFilter = category ? { "fields.category": category } : {};

  const [prevResponse, nextResponse] = await Promise.all([
    client.getEntries<ArticleSkeleton>({
      content_type: "article",
      ...categoryFilter,
      order: ["-fields.date", "-sys.id"],
      limit: 1,
      "fields.date[lt]": date,
    }),
    client.getEntries<ArticleSkeleton>({
      content_type: "article",
      ...categoryFilter,
      order: ["fields.date", "sys.id"],
      limit: 1,
      "fields.date[gt]": date,
    }),
  ]);

  return {
    prevArticle: prevResponse.items[0]
      ? toAdjacentArticleSummary(prevResponse.items[0])
      : undefined,
    nextArticle: nextResponse.items[0]
      ? toAdjacentArticleSummary(nextResponse.items[0])
      : undefined,
  };
}
