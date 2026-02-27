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

