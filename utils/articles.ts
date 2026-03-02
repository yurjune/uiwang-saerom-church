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
  limit: number,
): ArticleEntry[] => {
  const num = limit * currentPage;
  const limitedArticles = articles.slice(num - limit, num);
  return limitedArticles;
};
