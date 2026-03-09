import type {
  AdjacentArticleSummary,
  ArticleDetail,
  ArticleEntry,
  ArticleSummary,
} from "@/interface/article";

function getThumbnailUrl(article: ArticleEntry): string | null {
  const thumbnailUrl =
    article.fields.thumbnail && "fields" in article.fields.thumbnail
      ? article.fields.thumbnail.fields.file?.url
      : undefined;

  return thumbnailUrl ? `https:${thumbnailUrl}` : null;
}

export function toArticleSummary(article: ArticleEntry): ArticleSummary {
  return {
    sys: {
      id: article.sys.id,
      updatedAt: article.sys.updatedAt,
    },
    fields: {
      title: article.fields.title,
      category: article.fields.category,
      date: article.fields.date,
      tag: Array.isArray(article.fields.tag) ? article.fields.tag : undefined,
      thumbnailUrl: getThumbnailUrl(article),
    },
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
  return {
    sys: {
      id: article.sys.id,
      updatedAt: article.sys.updatedAt,
    },
    fields: {
      title: article.fields.title,
      category: article.fields.category,
      date: article.fields.date,
      tag: Array.isArray(article.fields.tag) ? article.fields.tag : undefined,
      paragraph: article.fields
        .paragraph as ArticleDetail["fields"]["paragraph"],
      thumbnailUrl: getThumbnailUrl(article),
    },
  };
}
