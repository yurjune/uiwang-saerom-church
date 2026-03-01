import { postNumberPerOnePage } from "@/constants/pagination";

export const filterByTag = (articles, value) => {
  if (value) {
    const result = articles.filter((article) =>
      article.fields.tag?.find((item) => item === value),
    );
    return result;
  }
  return articles;
};

export const getLimitedArticles = (articles, currentPage) => {
  const num = postNumberPerOnePage * currentPage;
  const limitedArticles = articles.slice(num - postNumberPerOnePage, num);
  return limitedArticles;
};

const extractText = (node) => {
  if (!node) {
    return "";
  }
  if (typeof node.value === "string") {
    return node.value;
  }
  if (Array.isArray(node.content)) {
    return node.content.map(extractText).join(" ");
  }
  return "";
};

export function getArticleThumbnailUrl(article) {
  const url = article.fields.thumbnail?.fields.file.url;
  return url ? `https:${url}` : null;
}

export function getArticleTags(article) {
  return Array.isArray(article.fields?.tag) ? article.fields.tag : [];
}

export const getArticleDescription = (article, fallback = "") => {
  const paragraph = article?.fields?.paragraph;
  const rawText = extractText(paragraph).replace(/\s+/g, " ").trim();
  const description = rawText ? rawText.slice(0, 140) : fallback;
  return description
    .replace(/https?:\/\/\S+/g, "") // remove links
    .replace(/\s+/g, " ")
    .trim();
};
