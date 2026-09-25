"use client";

import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import AdminLogin from "@/components/AdminLogin/AdminLogin";
import TitleThumbnail from "@/components/ContentListView/TitleThumbnail";
import { THUMBNAIL_PRESETS } from "@/constants/thumbnail";
import DatePicker from "@/components/DatePicker/DatePicker";
import BibleTagSelect from "@/components/BibleTagSelect/BibleTagSelect";
import ImageUploadField from "@/components/ImageUploadField/ImageUploadField";
import {
  MAX_NEWS_IMAGE_BYTES,
  MAX_NEWS_IMAGES,
  NEWS_IMAGE_ACCEPT,
} from "@/constants/upload";

type AuthState = "checking" | "authenticated" | "unauthenticated";
type Category =
  | typeof CONTENTFUL_CATEGORY.movies
  | typeof CONTENTFUL_CATEGORY.news;

type ApiResult = {
  ok?: boolean;
  authenticated?: boolean;
  id?: string;
  message?: string;
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

async function readApiResult(response: Response): Promise<ApiResult> {
  try {
    return (await response.json()) as ApiResult;
  } catch {
    return {};
  }
}

export default function AdminUploadClient() {
  const toast = useToast();
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [category, setCategory] = useState<Category>(
    CONTENTFUL_CATEGORY.movies,
  );
  const [progressLabel, setProgressLabel] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [thumbnailTitle, setThumbnailTitle] = useState("");
  const [thumbnailBible, setThumbnailBible] = useState("");
  const [previewSequence] = useState(() =>
    Math.floor(Math.random() * THUMBNAIL_PRESETS.length),
  );

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

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("category", category);
    const uploadedAssetIds: string[] = [];

    try {
      if (!isMovie) {
        for (const [index, image] of images.entries()) {
          setProgressLabel(`이미지 업로드 중 (${index + 1}/${images.length})…`);
          uploadedAssetIds.push(await uploadImage(image));
        }
        uploadedAssetIds.forEach((assetId) =>
          formData.append("assetIds", assetId),
        );
      }

      setProgressLabel("게시글 등록 중…");
      const response = await fetch("/api/admin/articles", {
        method: "POST",
        body: formData,
      });
      const result = await readApiResult(response);

      if (!response.ok || !result.ok) {
        throw new Error(result.message ?? "게시글 등록에 실패했습니다.");
      }

      form.reset();
      setTitle("");
      setThumbnailTitle("");
      setThumbnailBible("");
      setImages([]);
      setDate(null);
      setTags([]);
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
        title: "업로드에 실패했습니다.",
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

  return (
    <Box>
      <Flex justify="space-between" align="center" gap="16px">
        <Heading as="h2" size="lg">
          게시글 업로드
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
            <SimpleGrid columns={2} spacing="8px">
              {CATEGORY_OPTIONS.map((option) => {
                const selected = option === category;
                return (
                  <Button
                    key={option}
                    type="button"
                    h="48px"
                    borderRadius="10px"
                    border="1px solid"
                    borderColor={selected ? "blue.500" : "gray.200"}
                    bg={selected ? "blue.50" : "white"}
                    color={selected ? "blue.600" : "gray.600"}
                    fontWeight="700"
                    _hover={{ bg: selected ? "blue.50" : "gray.50" }}
                    aria-pressed={selected}
                    onClick={() => setCategory(option)}
                  >
                    {option}
                  </Button>
                );
              })}
            </SimpleGrid>
          </FormControl>

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
                    sequence={previewSequence}
                    title={thumbnailTitle.trim() || title.trim()}
                    bible={thumbnailBible.trim()}
                  />
                </Box>
                <Text fontSize="13px" color="gray.500" mt="8px">
                  배경은 실제 목록과 다를 수 있습니다.
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
                  {...fieldStyle}
                />
                <FormHelperText fontSize="13px" color="gray.500">
                  유튜브 주소를 그대로 붙여넣으면 임베드 주소로 자동 변환되어
                  저장됩니다.
                </FormHelperText>
              </FormControl>

              <FormControl id="admin-tags">
                <FormLabel {...labelStyle}>성경 본문 태그</FormLabel>
                <BibleTagSelect
                  labelId="admin-tags-label"
                  name="tags"
                  value={tags}
                  onChange={setTags}
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
            업로드
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
