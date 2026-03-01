import { ProjectUrl } from "@/constants/projectUrl";

export const CONTENTFUL_CATEGORY = {
  movies: "설교영상",
  news: "교회소식",
};

export const categoryMap = {
  [CONTENTFUL_CATEGORY.movies]: {
    label: "설교영상",
    url: ProjectUrl.movies.toString(),
    contentUrl: ProjectUrl.contents.movies.toString(),
  },
  [CONTENTFUL_CATEGORY.news]: {
    label: "교회소식",
    url: ProjectUrl.news.toString(),
    contentUrl: ProjectUrl.contents.news.toString(),
  },
};
