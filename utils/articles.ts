import { postNumberPerOnePage } from "@/constants/pagination";
import type { ArticleEntry } from "@/interface/article";

export const filterByTag = (
  articles: ArticleEntry[],
  value?: string,
): ArticleEntry[] => {
  if (value) {
    const result = articles.filter((article) =>
      article.fields.tag?.find((item) => item === value),
    );
    return result;
  }

  return articles;
};

export const getLimitedArticles = (
  articles: ArticleEntry[],
  currentPage: number,
): ArticleEntry[] => {
  const num = postNumberPerOnePage * currentPage;
  const limitedArticles = articles.slice(num - postNumberPerOnePage, num);
  return limitedArticles;
};
