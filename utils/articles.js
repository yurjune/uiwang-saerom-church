import { postNumberPerOnePage } from "../constants/pagination";

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

export const getArticleDescription = (article, fallback = "") => {
  const paragraph = article?.fields?.paragraph;
  const rawText = extractText(paragraph).replace(/\s+/g, " ").trim();
  return rawText ? rawText.slice(0, 140) : fallback;
};
