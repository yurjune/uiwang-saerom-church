import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export async function getPictures() {
  const pictures = await client.getEntries({
    content_type: "picture",
  });
  return pictures.items;
}

export async function getArticles() {
  const articles = await client.getEntries({
    content_type: "article",
  });
  return articles.items;
}

export async function getArticleById(id) {
  const article = await client.getEntries({
    content_type: "article",
    "sys.id": id,
  });
  return article.items[0];
}
