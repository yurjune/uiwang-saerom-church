import type {
  AdjacentArticleSummary,
  ArticleEntry,
  ArticleSummary,
} from "@/interface/article";

export function toArticleSummary(article: ArticleEntry): ArticleSummary {
  const thumbnailUrl =
    article.fields.thumbnail && "fields" in article.fields.thumbnail
      ? article.fields.thumbnail.fields.file?.url
      : undefined;

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
      thumbnailUrl: thumbnailUrl ? `https:${thumbnailUrl}` : null,
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
