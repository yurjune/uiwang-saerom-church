export const CONTENTFUL_CATEGORY = {
  movies: "설교영상",
  news: "교회소식",
};

export const categoryMap = {
  [CONTENTFUL_CATEGORY.movies]: {
    label: "설교영상",
    url: "/movies",
    contentUrl: "/contents/movies",
  },
  [CONTENTFUL_CATEGORY.news]: {
    label: "교회소식",
    url: "/news",
    contentUrl: "/contents/news",
  },
};
