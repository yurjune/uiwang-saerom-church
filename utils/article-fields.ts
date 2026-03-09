import type { ArticleEntry, ArticleSummary } from "@/interface/article";

type RichTextNodeLike = {
  value?: unknown;
  content?: RichTextNodeLike[];
};

const extractText = (node?: RichTextNodeLike): string => {
  if (!node) {
    return "";
  }
  if (typeof node.value === "string") {
    return node.value;
  }
  if (Array.isArray(node.content)) {
    return node.content.map(extractText).join(" ");
  }
  return "";
};

export function getArticleThumbnailUrl(
  article: ArticleEntry | ArticleSummary,
): string | null {
  if ("thumbnailUrl" in article.fields) {
    return article.fields.thumbnailUrl ?? null;
  }

  if (!("thumbnail" in article.fields)) {
    return null;
  }

  const { thumbnail } = article.fields;
  const url =
    thumbnail && "fields" in thumbnail
      ? thumbnail.fields?.file?.url
      : undefined;
  return url ? `https:${url}` : null;
}

export function getArticleTags(article: ArticleEntry): string[] {
  return Array.isArray(article.fields?.tag) ? article.fields.tag : [];
}

export const getArticleDescription = (
  article: ArticleEntry,
  fallback = "",
): string => {
  const paragraph = article?.fields?.paragraph;
  const rawText = extractText(paragraph).replace(/\s+/g, " ").trim();
  const description = rawText ? rawText.slice(0, 140) : fallback;
  return description
    .replace(/https?:\/\/\S+/g, "") // remove links
    .replace(/\s+/g, " ")
    .trim();
};
