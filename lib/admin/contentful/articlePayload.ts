import { CONTENTFUL_CATEGORY } from "@/constants/category";
import {
  MAX_NEWS_IMAGE_BYTES,
  MAX_NEWS_IMAGES,
  NEWS_IMAGE_TYPES,
} from "@/constants/upload";
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

const ASSET_ID_PATTERN = /^[A-Za-z0-9._-]+$/;

export function getAdminAssetIds(formData: FormData): string[] {
  const assetIds = formData
    .getAll("assetIds")
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim())
    .filter(Boolean);

  if (assetIds.length > MAX_NEWS_IMAGES) {
    throw new Error(
      `이미지는 최대 ${MAX_NEWS_IMAGES}장까지 업로드할 수 있습니다.`,
    );
  }

  if (assetIds.some((assetId) => !ASSET_ID_PATTERN.test(assetId))) {
    throw new Error("유효하지 않은 이미지 ID입니다.");
  }

  return assetIds;
}

export function assertAdminImageFile(value: FormDataEntryValue | null): File {
  if (!(value instanceof File) || value.size === 0) {
    throw new Error("업로드할 이미지가 필요합니다.");
  }

  if (!NEWS_IMAGE_TYPES.includes(value.type)) {
    throw new Error("PNG, JPG, WEBP 이미지만 업로드할 수 있습니다.");
  }

  if (value.size > MAX_NEWS_IMAGE_BYTES) {
    throw new Error("이미지는 한 장당 4MB 이하만 업로드할 수 있습니다.");
  }

  return value;
}

export function toContentfulArticleFields(
  payload: AdminArticlePayload,
  assetIds: string[] = [],
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
    paragraph:
      assetIds.length > 0
        ? createAssetDocument(assetIds)
        : createEmptyDocument(),
    thumbnailAssetId: assetIds[0],
  };
}
