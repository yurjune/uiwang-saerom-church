import { ProjectUrl } from "@/constants/projectUrl";

export type Category = "설교영상" | "교회소식";

export const CONTENTFUL_CATEGORY = {
  movies: "설교영상",
  news: "교회소식",
} satisfies Record<string, Category>;

export const MOVIE_TYPES = ["주일설교", "수요설교", "기타"] as const;

export type MovieType = (typeof MOVIE_TYPES)[number];

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
