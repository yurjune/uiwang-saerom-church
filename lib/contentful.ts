import { createClient } from "contentful";
import { ArticleEntry, ArticleSkeleton } from "../interface/article";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? "",
  accessToken: process.env.CONTENTFUL_ACCESS_KEY ?? "",
});

const DEFAULT_ARTICLE_ORDER = ["-sys.createdAt"];

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
  const { category, tag, limit, skip, order = DEFAULT_ARTICLE_ORDER } = options;
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
  const article = await client.getEntries<ArticleSkeleton>({
    content_type: "article",
    "sys.id": id,
  });
  return article.items[0];
}

type GetAdjacentArticlesOptions = {
  category?: string;
  createdAt: ArticleEntry["sys"]["createdAt"];
};

type GetAdjacentArticlesResult = {
  prevArticle?: ArticleEntry;
  nextArticle?: ArticleEntry;
};

export async function getAdjacentArticles(
  options: GetAdjacentArticlesOptions,
): Promise<GetAdjacentArticlesResult> {
  const { category, createdAt } = options;
  const categoryFilter = category ? { "fields.category": category } : {};

  const [prevResponse, nextResponse] = await Promise.all([
    client.getEntries<ArticleSkeleton>({
      content_type: "article",
      ...categoryFilter,
      order: ["-sys.createdAt", "-sys.id"],
      limit: 1,
      "sys.createdAt[lt]": createdAt,
    }),
    client.getEntries<ArticleSkeleton>({
      content_type: "article",
      ...categoryFilter,
      order: ["sys.createdAt", "sys.id"],
      limit: 1,
      "sys.createdAt[gt]": createdAt,
    }),
  ]);

  return {
    prevArticle: prevResponse.items[0],
    nextArticle: nextResponse.items[0],
  };
}
