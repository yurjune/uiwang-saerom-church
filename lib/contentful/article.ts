import type { Document } from "@contentful/rich-text-types";
import type { Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";

export type ArticleFields = {
  title?: EntryFieldTypes.Text;
  category?: EntryFieldTypes.Symbol;
  paragraph?: EntryFieldTypes.RichText;
  tag?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  thumbnail?: EntryFieldTypes.AssetLink;
  date: EntryFieldTypes.Date;
};

export type ArticleSkeleton = EntrySkeletonType<ArticleFields, "article">;

export type ArticleEntry = Entry<ArticleSkeleton, undefined>;

export type ArticleSummary = {
  sys: {
    id: string;
    updatedAt?: string;
  };
  fields: {
    title: string;
    category: string;
    date: string;
    tag: string[];
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
  fields: {
    title: string;
    category: string;
    date: string;
    tag: string[];
    paragraph: Document | null;
    thumbnailUrl: string | null;
  };
};
