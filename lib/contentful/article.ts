import type { Document } from "@contentful/rich-text-types";
import type { Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";

// 설교영상/교회소식이 한 모델을 쓰던 시절의 모델. 데이터 이전이 끝나면 제거한다.
export type LegacyArticleFields = {
  title?: EntryFieldTypes.Text;
  category?: EntryFieldTypes.Symbol;
  paragraph?: EntryFieldTypes.RichText;
  movieType?: EntryFieldTypes.Symbol;
  newsType?: EntryFieldTypes.Symbol;
  tag?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  thumbnailTitle?: EntryFieldTypes.Symbol;
  thumbnailBible?: EntryFieldTypes.Symbol;
  thumbnail?: EntryFieldTypes.AssetLink;
  date: EntryFieldTypes.Date;
};

export type MovieFields = {
  title: EntryFieldTypes.Symbol;
  date: EntryFieldTypes.Date;
  movieType?: EntryFieldTypes.Symbol;
  youtubeUrl?: EntryFieldTypes.Symbol;
  tag?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  thumbnailTitle?: EntryFieldTypes.Symbol;
  thumbnailBible?: EntryFieldTypes.Symbol;
  paragraph?: EntryFieldTypes.RichText;
  thumbnail?: EntryFieldTypes.AssetLink;
};

export type NewsFields = {
  title: EntryFieldTypes.Symbol;
  date: EntryFieldTypes.Date;
  newsType?: EntryFieldTypes.Symbol;
  images?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  paragraph?: EntryFieldTypes.RichText;
};

export type LegacyArticleSkeleton = EntrySkeletonType<
  LegacyArticleFields,
  "article"
>;
export type MovieSkeleton = EntrySkeletonType<MovieFields, "movie">;
export type NewsSkeleton = EntrySkeletonType<NewsFields, "news">;

export type AnyArticleSkeleton =
  | LegacyArticleSkeleton
  | MovieSkeleton
  | NewsSkeleton;

export type LegacyArticleEntry = Entry<LegacyArticleSkeleton, undefined>;
export type MovieEntry = Entry<MovieSkeleton, undefined>;
export type NewsEntry = Entry<NewsSkeleton, undefined>;
export type ArticleEntry = LegacyArticleEntry | MovieEntry | NewsEntry;

export type ArticleImage = {
  url: string;
  width: number;
  height: number;
  title: string;
};

export type ArticleSummary = {
  sys: {
    id: string;
    updatedAt?: string;
  };
  fields: {
    title: string;
    category: string;
    date: string;
    movieType: string | null;
    newsType: string | null;
    tag: string[];
    thumbnailTitle: string | null;
    thumbnailBible: string | null;
    thumbnailUrl: string | null;
  };
};

export type AdjacentArticleSummary = {
  sys: {
    id: string;
  };
};

export type ArticleDetail = {
  sys: {
    id: string;
    updatedAt?: string;
  };
  fields: ArticleSummary["fields"] & {
    youtubeUrl: string | null;
    paragraph: Document | null;
    images: ArticleImage[];
  };
};
