import { CONTENTFUL_CATEGORY } from "@/constants/category";
import {
  createAssetDocument,
  createEmptyDocument,
  createYouTubeParagraphDocument,
} from "./richText";
import { normalizeYouTubeEmbedUrl } from "./youtube";

type MovieArticlePayload = {
  category: typeof CONTENTFUL_CATEGORY.movies;
  title: string;
  youtubeUrl: string;
  tags: string[];
  date?: string;
};

type NewsArticlePayload = {
  category: typeof CONTENTFUL_CATEGORY.news;
  title: string;
  date?: string;
};

export type AdminArticlePayload = MovieArticlePayload | NewsArticlePayload;

export function assertString(
  value: FormDataEntryValue | null,
  fieldName: string,
) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${fieldName} 값이 필요합니다.`);
  }

  return value.trim();
}

function parseDate(value: string | undefined): string {
  if (!value) {
    return new Date().toISOString();
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error("유효한 날짜를 입력해주세요.");
  }

  return date.toISOString();
}

function parseTags(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function parseAdminArticleFormData(
  formData: FormData,
): AdminArticlePayload {
  const category = assertString(formData.get("category"), "category");
  const title = assertString(formData.get("title"), "title");
  const date = parseDate(
    typeof formData.get("date") === "string"
      ? (formData.get("date") as string)
      : undefined,
  );

  if (category === CONTENTFUL_CATEGORY.movies) {
    return {
      category,
      title,
      date,
      youtubeUrl: assertString(formData.get("youtubeUrl"), "youtubeUrl"),
      tags: parseTags(formData.get("tags")),
    };
  }

  if (category === CONTENTFUL_CATEGORY.news) {
    return {
      category,
      title,
      date,
    };
  }

  throw new Error("지원하지 않는 카테고리입니다.");
}

export function toContentfulArticleFields(
  payload: AdminArticlePayload,
  thumbnailAssetId?: string,
) {
  if (payload.category === CONTENTFUL_CATEGORY.movies) {
    const embedUrl = normalizeYouTubeEmbedUrl(payload.youtubeUrl);
    return {
      title: payload.title,
      category: payload.category,
      date: payload.date ?? new Date().toISOString(),
      tag: payload.tags,
      paragraph: createYouTubeParagraphDocument(embedUrl),
    };
  }

  return {
    title: payload.title,
    category: payload.category,
    date: payload.date ?? new Date().toISOString(),
    paragraph: thumbnailAssetId
      ? createAssetDocument(thumbnailAssetId)
      : createEmptyDocument(),
    thumbnailAssetId,
  };
}
