import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

const DEFAULT_ARTICLE_ORDER = ["-sys.createdAt"];

export async function getPictures() {
  const pictures = await client.getEntries({
    content_type: "picture",
  });
  return pictures.items;
}

export async function getArticles(options = {}) {
  const { category, limit, skip, order = DEFAULT_ARTICLE_ORDER } = options;
  const query = {
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

  const articles = await client.getEntries(query);
  return articles.items;
}

export async function getArticleById(id) {
  const article = await client.getEntries({
    content_type: "article",
    "sys.id": id,
  });
  return article.items[0];
}
