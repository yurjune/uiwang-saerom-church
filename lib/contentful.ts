import { createClient } from "contentful";
import { ArticleEntry, ArticleSkeleton } from "../interface/article";
import { cacheLife, cacheTag } from "next/cache";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? "",
  accessToken: process.env.CONTENTFUL_ACCESS_KEY ?? "",
});

const DEFAULT_ARTICLE_ORDER = ["-fields.date"];
const THIRTY_DAYS_IN_SECONDS = 60 * 60 * 24 * 30;
const SIX_MONTHS_IN_SECONDS = 60 * 60 * 24 * 30 * 6;

function getArticleTag(id: string): string {
  return `article:${id}`;
}

function getArticleCategoryTag(category?: string): string {
  return category ? `articles:${category}` : "articles";
}

type GetArticlesOptions = {
  category?: string;
  tag?: string;
  limit?: number;
  skip?: number;
  order?: string[];
};

type GetArticlesResult = {
  articles: ArticleEntry[];
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
    articles: response.items,
    totalCount: response.total,
  };
}

export async function getArticleById(
  id: string,
): Promise<ArticleEntry | undefined> {
  "use cache";
  cacheLife({ revalidate: SIX_MONTHS_IN_SECONDS });
  cacheTag(getArticleTag(id));

  const article = await client.getEntries<ArticleSkeleton>({
    content_type: "article",
    "sys.id": id,
  });
  return article.items[0];
}

type GetAdjacentArticlesOptions = {
  category?: string;
  date: ArticleEntry["fields"]["date"];
};

type GetAdjacentArticlesResult = {
  prevArticle?: ArticleEntry;
  nextArticle?: ArticleEntry;
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
    prevArticle: prevResponse.items[0],
    nextArticle: nextResponse.items[0],
  };
}
