import { cacheLife, cacheTag } from "next/cache";
import type {
  AdjacentArticleSummary,
  ArticleSkeleton,
} from "@/interface/article";
import { THIRTY_DAYS_IN_SECONDS } from "@/lib/contentful/constants";
import { client } from "@/lib/contentful/client";
import { getArticleCategoryTag } from "@/lib/contentful/tags";
import { toAdjacentArticleSummary } from "@/lib/contentful/transformers";

export type GetAdjacentArticlesOptions = {
  category?: string;
  date: string;
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

  const prevQuery: {
    content_type: "article";
    order: string[];
    limit: number;
    "fields.date[lt]": string;
    "fields.category"?: string;
  } = {
    content_type: "article",
    order: ["-fields.date", "-sys.id"],
    limit: 1,
    "fields.date[lt]": date,
  };

  const nextQuery: {
    content_type: "article";
    order: string[];
    limit: number;
    "fields.date[gt]": string;
    "fields.category"?: string;
  } = {
    content_type: "article",
    order: ["fields.date", "sys.id"],
    limit: 1,
    "fields.date[gt]": date,
  };

  if (category) {
    prevQuery["fields.category"] = category;
    nextQuery["fields.category"] = category;
  }

  const [prevResponse, nextResponse] = await Promise.all([
    client.getEntries<ArticleSkeleton>(prevQuery),
    client.getEntries<ArticleSkeleton>(nextQuery),
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
