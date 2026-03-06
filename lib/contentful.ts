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

export async function getPictures() {
  const pictures = await client.getEntries({
    content_type: "picture",
  });
  return pictures.items;
}

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
