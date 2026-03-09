import { cacheLife, cacheTag } from "next/cache";
import type { ArticleSkeleton, ArticleSummary } from "@/interface/article";
import {
  DEFAULT_ARTICLE_ORDER,
  THIRTY_DAYS_IN_SECONDS,
} from "@/lib/contentful/constants";
import { client } from "@/lib/contentful/client";
import { getArticleCategoryTag } from "@/lib/contentful/tags";
import { toArticleSummary } from "@/lib/contentful/transformers";

export type GetArticlesOptions = {
  category?: string;
  tag?: string;
  limit?: number;
  skip?: number;
  order?: string[];
};

export type GetArticlesResult = {
  articles: ArticleSummary[];
  totalCount: number;
};

export async function getArticles(
  options: GetArticlesOptions = {},
): Promise<GetArticlesResult> {
  "use cache";
  cacheLife({ revalidate: THIRTY_DAYS_IN_SECONDS });
  cacheTag("articles");

  const { category, tag, limit, skip, order = DEFAULT_ARTICLE_ORDER } = options;
  cacheTag(getArticleCategoryTag(category));

  const query: {
    content_type: "article";
    order: string[];
    limit?: number;
    skip?: number;
    "fields.category"?: string;
    "fields.tag[in]"?: string;
  } = {
    content_type: "article",
    order,
  };

  if (typeof limit === "number") {
    query.limit = limit;
  }
  if (typeof skip === "number") {
    query.skip = skip;
  }
  if (category) {
    query["fields.category"] = category;
  }
  if (tag) {
    query["fields.tag[in]"] = tag;
  }

  const response = await client.getEntries<ArticleSkeleton>(query);
  return {
    articles: response.items.map(toArticleSummary),
    totalCount: response.total,
  };
}
