import { postNumberPerOnePage } from "../utils/pagination";

// 가장 오래된 게시글이 가장 뒤로가게 정렬
export const sortArticles = (articles) => {
  const timeParser = (createdAt) => {
    const timeStamp = Date.parse(new Date(createdAt)) / 1000;
    return timeStamp;
  };
  const sortedArticles = articles.sort((a, b) => {
    return timeParser(b.sys.createdAt) - timeParser(a.sys.createdAt);
  });
  return sortedArticles;
};

export const filterByTag = (articles, value) => {
  if (value) {
    const result = articles.filter((article) =>
      article.fields.tag?.find((item) => item === value),
    );
    return result;
  }
  return articles;
};

// 게시글을 한페이지에 12개씩 나타냄
export const getLimitedArticles = (articles, currentPage) => {
  const num = postNumberPerOnePage * currentPage;
  const limitedArticles = articles.slice(num - postNumberPerOnePage, num);
  return limitedArticles;
};

export const searchArticles = (articles, keyword) => {
  const searchResult = articles.filter(
    (article) =>
      article.fields.title.includes(keyword) ||
      article.fields.paragraph.content.some((item) => {
        return item.content.some((post) => {
          return post.value?.includes(keyword);
        });
      }),
  );
  return searchResult;
};
