import type { Document } from "@contentful/rich-text-types";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import type {
  AdjacentArticleSummary,
  ArticleDetail,
  ArticleEntry,
  ArticleImage,
  ArticleSummary,
} from "@/lib/contentful/article";

type AssetLike = {
  fields?: {
    title?: unknown;
    file?: {
      url?: unknown;
      details?: { image?: { width?: number; height?: number } };
    };
  };
};

function toArticleImage(asset: unknown): ArticleImage | null {
  const fields = (asset as AssetLike | undefined)?.fields;
  const url = fields?.file?.url;
  const image = fields?.file?.details?.image;
  if (typeof url !== "string" || !image?.width || !image?.height) {
    return null;
  }

  return {
    url: `https:${url}`,
    width: image.width,
    height: image.height,
    title: typeof fields?.title === "string" ? fields.title : "",
  };
}

function getImages(article: ArticleEntry): ArticleImage[] {
  if (article.sys.contentType.sys.id !== "news") {
    return [];
  }

  const images = (article.fields as { images?: unknown[] }).images ?? [];
  return images
    .map(toArticleImage)
    .filter((image): image is ArticleImage => image !== null);
}

function getThumbnailUrl(article: ArticleEntry): string | null {
  if (article.sys.contentType.sys.id === "news") {
    return getImages(article)[0]?.url ?? null;
  }

  const thumbnail = (article.fields as { thumbnail?: unknown }).thumbnail;
  return toArticleImage(thumbnail)?.url ?? null;
}

function getCategory(article: ArticleEntry): string {
  switch (article.sys.contentType.sys.id) {
    case "movie":
      return CONTENTFUL_CATEGORY.movies;
    case "news":
      return CONTENTFUL_CATEGORY.news;
    default:
      return (article.fields as { category?: string }).category ?? "";
  }
}

function readString(article: ArticleEntry, fieldId: string): string | null {
  const value = (article.fields as Record<string, unknown>)[fieldId];
  return typeof value === "string" ? value : null;
}

function getSummaryFields(article: ArticleEntry): ArticleSummary["fields"] {
  const tag = (article.fields as { tag?: string[] }).tag;

  return {
    title: readString(article, "title") ?? "",
    category: getCategory(article),
    date: article.fields.date,
    movieType: readString(article, "movieType"),
    newsType: readString(article, "newsType"),
    tag: tag ?? [],
    thumbnailTitle: readString(article, "thumbnailTitle"),
    thumbnailBible: readString(article, "thumbnailBible"),
    thumbnailUrl: getThumbnailUrl(article),
  };
}

export function toArticleSummary(article: ArticleEntry): ArticleSummary {
  return {
    sys: {
      id: article.sys.id,
      updatedAt: article.sys.updatedAt,
    },
    fields: getSummaryFields(article),
  };
}

export function toAdjacentArticleSummary(
  article: ArticleEntry,
): AdjacentArticleSummary {
  return {
    sys: {
      id: article.sys.id,
    },
  };
}

export function toArticleDetail(article: ArticleEntry): ArticleDetail {
  const paragraph = (article.fields as { paragraph?: Document }).paragraph;

  return {
    sys: {
      id: article.sys.id,
      updatedAt: article.sys.updatedAt,
    },
    fields: {
      ...getSummaryFields(article),
      youtubeUrl: readString(article, "youtubeUrl"),
      paragraph: paragraph ?? null,
      images: getImages(article),
    },
  };
}
