import type { Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";

export type ArticleFields = {
  title?: EntryFieldTypes.Text;
  category?: EntryFieldTypes.Symbol;
  paragraph?: EntryFieldTypes.RichText;
  tag?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  thumbnail?: EntryFieldTypes.AssetLink;
};

export type ArticleSkeleton = EntrySkeletonType<ArticleFields, "article">;

export type ArticleEntry = Entry<ArticleSkeleton, undefined>;
