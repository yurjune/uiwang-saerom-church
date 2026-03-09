import { cacheLife, cacheTag } from "next/cache";
import type {
  ArticleDetail,
  ArticleSkeleton,
  ArticleSummary,
} from "@/lib/contentful/article";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import {
  DEFAULT_ARTICLE_ORDER,
  THIRTY_DAYS_IN_SECONDS,
} from "@/lib/contentful/constants";
import { client } from "@/lib/contentful/client";
import { getArticleCategoryTag } from "@/lib/contentful/tags";
import {
  toArticleDetail,
  toArticleSummary,
} from "@/lib/contentful/transformers";

export type GetNewsArticlesResult = {
  articles: ArticleSummary[];
  firstArticle: ArticleDetail | null;
};

export async function getNewsArticles(): Promise<GetNewsArticlesResult> {
  "use cache";
  cacheLife({ revalidate: THIRTY_DAYS_IN_SECONDS });
  cacheTag("articles");
  cacheTag(getArticleCategoryTag(CONTENTFUL_CATEGORY.news));

  const query: {
    content_type: "article";
    order: string[];
    "fields.category": string;
  } = {
    content_type: "article",
    order: DEFAULT_ARTICLE_ORDER,
    "fields.category": CONTENTFUL_CATEGORY.news,
  };

  const response = await client.getEntries<ArticleSkeleton>(query);

  return {
    articles: response.items.map(toArticleSummary),
    firstArticle: response.items[0] ? toArticleDetail(response.items[0]) : null,
  };
}
