import { cacheLife, cacheTag } from "next/cache";
import type { ArticleEntry, ArticleSummary } from "@/lib/contentful/article";
import {
  DEFAULT_ARTICLE_ORDER,
  THIRTY_DAYS_IN_SECONDS,
} from "@/lib/contentful/constants";
import { client } from "@/lib/contentful/client";
import {
  categoryToContentType,
  LEGACY_ARTICLE_CONTENT_TYPE,
  MOVIE_CONTENT_TYPE,
  NEWS_CONTENT_TYPE,
  withLegacyFallback,
} from "@/lib/contentful/contentTypes";
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

type ArticleQuery = {
  content_type: string;
  order: string[];
  limit?: number;
  skip?: number;
  "fields.category"?: string;
  "fields.tag[in]"?: string;
};

// 사이트맵처럼 전체 게시글이 필요할 때 한 번에 가져올 최대 개수
const ALL_ARTICLES_LIMIT = 1000;

async function queryEntries(query: ArticleQuery) {
  const response = await client.getEntries(
    query as Parameters<typeof client.getEntries>[0],
  );
  return {
    items: response.items as unknown as ArticleEntry[],
    total: response.total,
  };
}

async function getAllArticles(order: string[]) {
  return withLegacyFallback(
    async () => {
      const responses = await Promise.all(
        [MOVIE_CONTENT_TYPE, NEWS_CONTENT_TYPE].map((contentType) =>
          queryEntries({
            content_type: contentType,
            order,
            limit: ALL_ARTICLES_LIMIT,
          }),
        ),
      );
      const items = responses
        .flatMap((response) => response.items)
        .sort((a, b) => b.fields.date.localeCompare(a.fields.date));
      return {
        items,
        total: responses.reduce((sum, response) => sum + response.total, 0),
      };
    },
    () =>
      queryEntries({
        content_type: LEGACY_ARTICLE_CONTENT_TYPE,
        order,
        limit: ALL_ARTICLES_LIMIT,
      }),
  );
}

export async function getArticles(
  options: GetArticlesOptions = {},
): Promise<GetArticlesResult> {
  "use cache";
  cacheLife({ revalidate: THIRTY_DAYS_IN_SECONDS });
  cacheTag("articles");

  const { category, tag, limit, skip, order = DEFAULT_ARTICLE_ORDER } = options;

  if (!category) {
    const response = await getAllArticles(order);
    return {
      articles: response.items.map(toArticleSummary),
      totalCount: response.total,
    };
  }

  const query: Omit<ArticleQuery, "content_type"> = { order };
  if (typeof limit === "number") {
    query.limit = limit;
  }
  if (typeof skip === "number") {
    query.skip = skip;
  }
  if (tag) {
    query["fields.tag[in]"] = tag;
  }

  const response = await withLegacyFallback(
    () =>
      queryEntries({ ...query, content_type: categoryToContentType(category) }),
    () =>
      queryEntries({
        ...query,
        content_type: LEGACY_ARTICLE_CONTENT_TYPE,
        "fields.category": category,
      }),
  );

  return {
    articles: response.items.map(toArticleSummary),
    totalCount: response.total,
  };
}
