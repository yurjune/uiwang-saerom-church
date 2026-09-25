import { cacheLife, cacheTag } from "next/cache";
import type {
  AdjacentArticleSummary,
  ArticleEntry,
} from "@/lib/contentful/article";
import { THIRTY_DAYS_IN_SECONDS } from "@/lib/contentful/constants";
import { client } from "@/lib/contentful/client";
import {
  categoryToContentType,
  LEGACY_ARTICLE_CONTENT_TYPE,
  withLegacyFallback,
} from "@/lib/contentful/contentTypes";
import { toAdjacentArticleSummary } from "@/lib/contentful/transformers";

export type GetAdjacentArticlesOptions = {
  category: string;
  date: string;
};

export type GetAdjacentArticlesResult = {
  prevArticle?: AdjacentArticleSummary;
  nextArticle?: AdjacentArticleSummary;
};

type Direction = "prev" | "next";

async function findAdjacent(
  contentType: string,
  date: string,
  direction: Direction,
  category?: string,
) {
  const query = {
    content_type: contentType,
    limit: 1,
    ...(direction === "prev"
      ? { order: ["-fields.date", "-sys.id"], "fields.date[lt]": date }
      : { order: ["fields.date", "sys.id"], "fields.date[gt]": date }),
    ...(category ? { "fields.category": category } : {}),
  };
  const response = await client.getEntries(
    query as Parameters<typeof client.getEntries>[0],
  );

  return {
    item: response.items[0] as unknown as ArticleEntry | undefined,
    total: response.total,
  };
}

async function getAdjacent(
  category: string,
  date: string,
  direction: Direction,
) {
  const response = await withLegacyFallback(
    () => findAdjacent(categoryToContentType(category), date, direction),
    () => findAdjacent(LEGACY_ARTICLE_CONTENT_TYPE, date, direction, category),
  );

  return response.item ? toAdjacentArticleSummary(response.item) : undefined;
}

export async function getAdjacentArticles(
  options: GetAdjacentArticlesOptions,
): Promise<GetAdjacentArticlesResult> {
  "use cache";
  cacheLife({ revalidate: THIRTY_DAYS_IN_SECONDS });
  cacheTag("articles");

  const { category, date } = options;
  const [prevArticle, nextArticle] = await Promise.all([
    getAdjacent(category, date, "prev"),
    getAdjacent(category, date, "next"),
  ]);

  return { prevArticle, nextArticle };
}
