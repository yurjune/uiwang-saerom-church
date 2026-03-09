import type { ArticleDetail, ArticleEntry } from "@/lib/contentful/article";

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

export const getArticleShortenDescription = (
  article: ArticleDetail | ArticleEntry,
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
