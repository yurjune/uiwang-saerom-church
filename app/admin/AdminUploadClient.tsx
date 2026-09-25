"use client";

import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CONTENTFUL_CATEGORY,
  MOVIE_TYPES,
  NEWS_TYPES,
  type MovieType,
  type NewsType,
} from "@/constants/category";
import ToggleButtonGroup from "@/components/ToggleButtonGroup/ToggleButtonGroup";
import AdminLogin from "@/components/AdminLogin/AdminLogin";
import TitleThumbnail from "@/components/ContentListView/TitleThumbnail";
import DatePicker from "@/components/DatePicker/DatePicker";
import BibleTagSelect from "@/components/BibleTagSelect/BibleTagSelect";
import ImageUploadField, {
  type ImageUploadItem,
} from "@/components/ImageUploadField/ImageUploadField";
import {
  MAX_NEWS_IMAGE_BYTES,
  MAX_NEWS_IMAGES,
  NEWS_IMAGE_ACCEPT,
} from "@/constants/upload";
import type { AdminArticleDetail } from "@/lib/admin/contentful/management";
import { categoryToContentUrl } from "@/utils/category";

type AuthState = "checking" | "authenticated" | "unauthenticated";
type Category =
  | typeof CONTENTFUL_CATEGORY.movies
  | typeof CONTENTFUL_CATEGORY.news;

type ApiResult = {
  ok?: boolean;
  authenticated?: boolean;
  id?: string;
  message?: string;
  article?: AdminArticleDetail;
};

type Props = {
  // 있으면 해당 게시글을 불러와 수정하고, 없으면 새 게시글을 업로드한다.
  articleId?: string;
};

type FormSubmitEvent = {
  preventDefault: () => void;
  currentTarget: HTMLFormElement;
};

const CATEGORY_OPTIONS = [CONTENTFUL_CATEGORY.movies, CONTENTFUL_CATEGORY.news];

const fieldStyle = {
  h: "48px",
  borderRadius: "10px",
} as const;

const labelStyle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "gray.700",
} as const;

function findOption<T extends string>(
  options: readonly T[],
  value: string | null,
): T | null {
  return options.find((option) => option === value) ?? null;
}

function getAssetIds(items: ImageUploadItem[]) {
  return items.flatMap((item) => (item.kind === "asset" ? [item.id] : []));
}

async function readApiResult(response: Response): Promise<ApiResult> {
  try {
    return (await response.json()) as ApiResult;
  } catch {
    return {};
  }
}

export default function AdminUploadClient({ articleId }: Props) {
  const toast = useToast();
  const router = useRouter();
  const isEdit = articleId !== undefined;
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">(
    isEdit ? "loading" : "ready",
  );
  const [loadError, setLoadError] = useState<string | null>(null);
  const [initialAssetIds, setInitialAssetIds] = useState<string[]>([]);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [contentText, setContentText] = useState("");
  const [category, setCategory] = useState<Category>(
    CONTENTFUL_CATEGORY.movies,
  );
  const [progressLabel, setProgressLabel] = useState<string | null>(null);
  const [images, setImages] = useState<ImageUploadItem[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [movieType, setMovieType] = useState<MovieType | null>(null);
  const [hasMovieTypeError, setHasMovieTypeError] = useState(false);
  const [newsType, setNewsType] = useState<NewsType | null>(null);
  const [hasNewsTypeError, setHasNewsTypeError] = useState(false);
  const [title, setTitle] = useState("");
  const [thumbnailTitle, setThumbnailTitle] = useState("");
  const [thumbnailBible, setThumbnailBible] = useState("");

  const isMovie = category === CONTENTFUL_CATEGORY.movies;

  useEffect(() => {
    let canceled = false;

    async function checkSession() {
      try {
        const response = await fetch("/api/admin/session", {
          method: "GET",
          cache: "no-store",
        });
        const result = await readApiResult(response);
        if (!canceled) {
          setAuthState(
            result.authenticated ? "authenticated" : "unauthenticated",
          );
        }
      } catch {
        if (!canceled) {
          setAuthState("unauthenticated");
        }
      }
    }

    checkSession();

    return () => {
      canceled = true;
    };
  }, []);

  useEffect(() => {
    if (!articleId || authState !== "authenticated") {
      return;
    }

    let canceled = false;

    async function loadArticle(id: string) {
      try {
        const response = await fetch(
          `/api/admin/articles/${encodeURIComponent(id)}`,
          { cache: "no-store" },
        );
        const result = await readApiResult(response);
        if (!response.ok || !result.ok || !result.article) {
          throw new Error(result.message);
        }
        if (canceled) {
          return;
        }

        const article = result.article;
        const loadedImages: ImageUploadItem[] = article.images.map((image) => ({
          kind: "asset",
          ...image,
        }));
        setCategory(
          article.category === CONTENTFUL_CATEGORY.news
            ? CONTENTFUL_CATEGORY.news
            : CONTENTFUL_CATEGORY.movies,
        );
        setTitle(article.title);
        setThumbnailTitle(article.thumbnailTitle ?? "");
        setThumbnailBible(article.thumbnailBible ?? "");
        setMovieType(findOption(MOVIE_TYPES, article.movieType));
        setNewsType(findOption(NEWS_TYPES, article.newsType));
        setDate(article.date ? new Date(article.date) : null);
        setTags(article.tags);
        setYoutubeUrl(article.youtubeUrl ?? "");
        setContentText(article.contentText ?? "");
        setImages(loadedImages);
        setInitialAssetIds(getAssetIds(loadedImages));
        setLoadState("ready");
      } catch (error) {
        if (!canceled) {
          setLoadError(error instanceof Error ? error.message : null);
          setLoadState("error");
        }
      }
    }

    loadArticle(articleId);

    return () => {
      canceled = true;
    };
  }, [articleId, authState]);

  async function login(nextPassword: string) {
    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: nextPassword }),
      });
      const result = await readApiResult(response);
      const ok = response.ok && Boolean(result.authenticated);

      if (ok) {
        setAuthState("authenticated");
      }

      return ok;
    } catch {
      return false;
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/session", {
      method: "DELETE",
    });
    setAuthState("unauthenticated");
  }

  async function uploadImage(image: File) {
    const body = new FormData();
    body.append("image", image);

    const response = await fetch("/api/admin/assets", {
      method: "POST",
      body,
    });
    const result = await readApiResult(response);

    if (!response.ok || !result.ok || !result.id) {
      throw new Error(result.message ?? `${image.name} 업로드에 실패했습니다.`);
    }

    return result.id;
  }

  async function deleteImages(assetIds: string[]) {
    await Promise.allSettled(
      assetIds.map((assetId) =>
        fetch(`/api/admin/assets/${assetId}`, { method: "DELETE" }),
      ),
    );
  }

  async function handleCreateArticle(event: FormSubmitEvent) {
    event.preventDefault();

    if (isMovie && !movieType) {
      setHasMovieTypeError(true);
      return;
    }
    if (!isMovie && !newsType) {
      setHasNewsTypeError(true);
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("category", category);
    if (isMovie && movieType) {
      formData.set("movieType", movieType);
    }
    if (!isMovie && newsType) {
      formData.set("newsType", newsType);
    }
    const uploadedAssetIds: string[] = [];

    try {
      if (!isMovie) {
        const newFiles = images.filter((image) => image.kind === "file");
        const assetIds: string[] = [];
        for (const image of images) {
          if (image.kind === "asset") {
            assetIds.push(image.id);
            continue;
          }
          setProgressLabel(
            `이미지 업로드 중 (${uploadedAssetIds.length + 1}/${newFiles.length})…`,
          );
          const assetId = await uploadImage(image.file);
          uploadedAssetIds.push(assetId);
          assetIds.push(assetId);
        }
        assetIds.forEach((assetId) => formData.append("assetIds", assetId));
        formData.set(
          "updateImages",
          String(assetIds.join(",") !== initialAssetIds.join(",")),
        );
      }

      setProgressLabel(isEdit ? "게시글 수정 중…" : "게시글 등록 중…");
      const response = await fetch(
        isEdit
          ? `/api/admin/articles/${encodeURIComponent(articleId)}`
          : "/api/admin/articles",
        {
          method: isEdit ? "PUT" : "POST",
          body: formData,
        },
      );
      const result = await readApiResult(response);

      if (!response.ok || !result.ok) {
        throw new Error(
          result.message ??
            (isEdit
              ? "게시글 수정에 실패했습니다."
              : "게시글 등록에 실패했습니다."),
        );
      }

      if (isEdit) {
        toast({
          status: "success",
          title: "수정이 완료되었습니다.",
          description: String(formData.get("title") ?? ""),
        });
        router.push(`${categoryToContentUrl(category)}/${articleId}`);
        router.refresh();
        return;
      }

      form.reset();
      setTitle("");
      setYoutubeUrl("");
      setContentText("");
      setThumbnailTitle("");
      setThumbnailBible("");
      setImages([]);
      setDate(null);
      setTags([]);
      setMovieType(null);
      setNewsType(null);
      setCategory(CONTENTFUL_CATEGORY.movies);
      toast({
        status: "success",
        title: "업로드가 완료되었습니다.",
        description: String(formData.get("title") ?? ""),
      });
    } catch (error) {
      await deleteImages(uploadedAssetIds);
      toast({
        status: "error",
        title: isEdit ? "수정에 실패했습니다." : "업로드에 실패했습니다.",
        description: error instanceof Error ? error.message : undefined,
      });
    } finally {
      setProgressLabel(null);
    }
  }

  if (authState === "checking") {
    return (
      <Box py="80px" textAlign="center">
        <Text color="grayLetter">확인 중입니다.</Text>
      </Box>
    );
  }

  if (authState === "unauthenticated") {
    return <AdminLogin onLogin={login} />;
  }

  if (loadState !== "ready") {
    return (
      <Box py="80px" textAlign="center">
        <Text color="grayLetter">
          {loadState === "loading"
            ? "게시글을 불러오는 중입니다."
            : loadError || "게시글을 불러오지 못했습니다."}
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" gap="16px">
        <Heading as="h2" size="lg">
          {isEdit ? "게시글 수정" : "게시글 업로드"}
        </Heading>

        <Button variant="outline" flexShrink={0} onClick={handleLogout}>
          로그아웃
        </Button>
      </Flex>

      <Divider mt="20px" mb="30px" />

      <Box as="form" onSubmit={handleCreateArticle} maxW="640px" mx="auto">
        <Stack spacing="24px">
          <FormControl as="fieldset">
            <FormLabel as="legend" {...labelStyle}>
              카테고리
            </FormLabel>
            <ToggleButtonGroup
              options={CATEGORY_OPTIONS}
              value={category}
              onChange={setCategory}
              isDisabled={isEdit}
            />
          </FormControl>

          {isMovie && (
            <FormControl as="fieldset" isRequired isInvalid={hasMovieTypeError}>
              <FormLabel as="legend" {...labelStyle}>
                설교 종류
              </FormLabel>
              <ToggleButtonGroup
                options={MOVIE_TYPES}
                value={movieType}
                onChange={(next) => {
                  setMovieType(next);
                  setHasMovieTypeError(false);
                }}
                isInvalid={hasMovieTypeError}
              />
              <FormErrorMessage fontSize="14px">
                설교 종류를 선택해 주세요.
              </FormErrorMessage>
            </FormControl>
          )}

          {!isMovie && (
            <FormControl as="fieldset" isRequired isInvalid={hasNewsTypeError}>
              <FormLabel as="legend" {...labelStyle}>
                소식 종류
              </FormLabel>
              <ToggleButtonGroup
                options={NEWS_TYPES}
                value={newsType}
                onChange={(next) => {
                  setNewsType(next);
                  setHasNewsTypeError(false);
                }}
                isInvalid={hasNewsTypeError}
              />
              <FormErrorMessage fontSize="14px">
                소식 종류를 선택해 주세요.
              </FormErrorMessage>
            </FormControl>
          )}

          <FormControl isRequired>
            <FormLabel {...labelStyle}>제목</FormLabel>
            <Input
              name="title"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              {...fieldStyle}
            />
          </FormControl>

          {isMovie && (
            <>
              <FormControl>
                <FormLabel {...labelStyle}>썸네일 제목</FormLabel>
                <Input
                  name="thumbnailTitle"
                  placeholder="썸네일에 표시할 제목을 입력하세요"
                  value={thumbnailTitle}
                  onChange={(event) => setThumbnailTitle(event.target.value)}
                  maxLength={256}
                  {...fieldStyle}
                />
                <FormHelperText fontSize="13px" color="gray.500">
                  비워두면 게시글 제목이 썸네일에 표시됩니다.
                </FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel {...labelStyle}>썸네일 본문 말씀</FormLabel>
                <Input
                  name="thumbnailBible"
                  placeholder="예) 창 1:1"
                  value={thumbnailBible}
                  onChange={(event) => setThumbnailBible(event.target.value)}
                  maxLength={256}
                  {...fieldStyle}
                />
                <FormHelperText fontSize="13px" color="gray.500">
                  썸네일에서 제목 아래에 표시됩니다.
                </FormHelperText>
              </FormControl>

              <Box>
                <Text {...labelStyle} mb="8px">
                  썸네일 미리보기
                </Text>
                <Box
                  w="240px"
                  maxW="100%"
                  borderRadius="10px"
                  overflow="hidden"
                  border="1px solid"
                  borderColor="gray.200"
                >
                  <TitleThumbnail
                    sequence={0}
                    title={thumbnailTitle.trim() || title.trim()}
                    bible={thumbnailBible.trim()}
                  />
                </Box>
                <Text fontSize="13px" color="gray.500" mt="8px">
                  배경은 실제와 다를 수 있습니다.
                </Text>
              </Box>
            </>
          )}

          <FormControl id="admin-date">
            <FormLabel {...labelStyle}>날짜</FormLabel>
            <DatePicker
              id="admin-date"
              name="date"
              value={date}
              onChange={setDate}
            />
            <FormHelperText fontSize="13px" color="gray.500">
              비워두면 업로드 시각으로 저장됩니다.
            </FormHelperText>
          </FormControl>

          {isMovie ? (
            <>
              <FormControl isRequired>
                <FormLabel {...labelStyle}>유튜브 링크</FormLabel>
                <Input
                  name="youtubeUrl"
                  type="url"
                  placeholder="https://www.youtube.com/watch?v="
                  value={youtubeUrl}
                  onChange={(event) => setYoutubeUrl(event.target.value)}
                  {...fieldStyle}
                />
                <FormHelperText fontSize="13px" color="gray.500">
                  유튜브 주소를 그대로 붙여넣으면 임베드 주소로 자동 변환되어
                  저장됩니다.
                </FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel {...labelStyle}>내용</FormLabel>
                <Textarea
                  name="contentText"
                  placeholder="내용을 입력하세요"
                  value={contentText}
                  onChange={(event) => setContentText(event.target.value)}
                  minH="360px"
                  borderRadius="10px"
                  resize="vertical"
                />
                <FormHelperText fontSize="13px" color="gray.500">
                  줄바꿈은 상세 페이지 본문에 그대로 표시됩니다.
                </FormHelperText>
              </FormControl>

              <FormControl id="admin-tags">
                <FormLabel {...labelStyle}>태그</FormLabel>
                <BibleTagSelect
                  labelId="admin-tags-label"
                  name="tags"
                  value={tags}
                  onChange={setTags}
                  placeholder="태그를 선택하세요."
                />
              </FormControl>
            </>
          ) : (
            <FormControl id="admin-image">
              <FormLabel {...labelStyle}>이미지</FormLabel>
              <ImageUploadField
                id="admin-image"
                value={images}
                onChange={setImages}
                max={MAX_NEWS_IMAGES}
                accept={NEWS_IMAGE_ACCEPT}
                maxBytes={MAX_NEWS_IMAGE_BYTES}
                onReject={(message) =>
                  toast({ status: "warning", title: message })
                }
              />
              <FormHelperText fontSize="13px" color="gray.500">
                첫 번째 이미지가 대표 이미지로 사용됩니다.
              </FormHelperText>
            </FormControl>
          )}

          <Button
            type="submit"
            w="100%"
            h="48px"
            mt="4px"
            borderRadius="10px"
            colorScheme="blue"
            fontWeight="700"
            isLoading={progressLabel !== null}
            loadingText={progressLabel ?? undefined}
          >
            {isEdit ? "수정" : "업로드"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
