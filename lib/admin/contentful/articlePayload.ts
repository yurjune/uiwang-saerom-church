import {
  CONTENTFUL_CATEGORY,
  MOVIE_TYPES,
  NEWS_TYPES,
  type MovieType,
  type NewsType,
} from "@/constants/category";
import {
  MAX_NEWS_IMAGE_BYTES,
  MAX_NEWS_IMAGES,
  NEWS_IMAGE_TYPES,
} from "@/constants/upload";
import { normalizeYouTubeEmbedUrl } from "./youtube";

type MovieArticlePayload = {
  category: typeof CONTENTFUL_CATEGORY.movies;
  title: string;
  youtubeUrl: string;
  movieType: MovieType;
  tags: string[];
  thumbnailTitle?: string;
  thumbnailBible?: string;
  date?: string;
};

type NewsArticlePayload = {
  category: typeof CONTENTFUL_CATEGORY.news;
  title: string;
  newsType: NewsType;
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

function parseMovieType(value: FormDataEntryValue | null): MovieType {
  const movieType = MOVIE_TYPES.find((type) => type === value);
  if (!movieType) {
    throw new Error("설교 종류를 선택해주세요.");
  }

  return movieType;
}

function parseNewsType(value: FormDataEntryValue | null): NewsType {
  const newsType = NEWS_TYPES.find((type) => type === value);
  if (!newsType) {
    throw new Error("소식 종류를 선택해주세요.");
  }

  return newsType;
}

const MAX_SYMBOL_LENGTH = 256;

function parseOptionalSymbol(value: FormDataEntryValue | null, label: string) {
  if (typeof value !== "string" || !value.trim()) {
    return undefined;
  }

  const text = value.trim();
  if (text.length > MAX_SYMBOL_LENGTH) {
    throw new Error(`${label}은 ${MAX_SYMBOL_LENGTH}자 이하로 입력해주세요.`);
  }

  return text;
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
      movieType: parseMovieType(formData.get("movieType")),
      tags: parseTags(formData.get("tags")),
      thumbnailTitle: parseOptionalSymbol(
        formData.get("thumbnailTitle"),
        "썸네일 제목",
      ),
      thumbnailBible: parseOptionalSymbol(
        formData.get("thumbnailBible"),
        "썸네일 본문 말씀",
      ),
    };
  }

  if (category === CONTENTFUL_CATEGORY.news) {
    return {
      category,
      title,
      date,
      newsType: parseNewsType(formData.get("newsType")),
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

type ArticleFieldOptions = {
  // 수정 시 이미지를 바꾸지 않았다면 기존 이미지를 그대로 둔다.
  updateImages?: boolean;
};

export function toContentfulArticleFields(
  payload: AdminArticlePayload,
  assetIds: string[] = [],
  { updateImages = true }: ArticleFieldOptions = {},
) {
  const date = payload.date ?? new Date().toISOString();

  if (payload.category === CONTENTFUL_CATEGORY.movies) {
    return {
      title: payload.title,
      category: payload.category,
      date,
      movieType: payload.movieType,
      youtubeUrl: normalizeYouTubeEmbedUrl(payload.youtubeUrl),
      tag: payload.tags,
      thumbnailTitle: payload.thumbnailTitle,
      thumbnailBible: payload.thumbnailBible,
    };
  }

  return {
    title: payload.title,
    category: payload.category,
    date,
    newsType: payload.newsType,
    imageAssetIds: updateImages ? assetIds : undefined,
  };
}
