import { createClient } from "contentful";
import { ArticleEntry, ArticleSkeleton } from "../interface/article";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? "",
  accessToken: process.env.CONTENTFUL_ACCESS_KEY ?? "",
});

const DEFAULT_ARTICLE_ORDER = ["-sys.createdAt"];

type GetArticlesOptions = {
  category?: string;
  limit?: number;
  skip?: number;
  order?: string[];
};

export async function getPictures() {
  const pictures = await client.getEntries({
    content_type: "picture",
  });
  return pictures.items;
}

export async function getArticles(
  options: GetArticlesOptions = {},
): Promise<ArticleEntry[]> {
  const { category, limit, skip, order = DEFAULT_ARTICLE_ORDER } = options;
  const query: {
    content_type: "article";
    order: string[];
    "fields.category"?: string;
    limit?: number;
    skip?: number;
  } = {
    content_type: "article",
    order,
  };

  if (category) {
    query["fields.category"] = category;
  }
  if (typeof limit === "number") {
    query.limit = limit;
  }
  if (typeof skip === "number") {
    query.skip = skip;
  }

  const articles = await client.getEntries<ArticleSkeleton>(query);
  return articles.items;
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
