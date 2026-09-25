"use client";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import { Bible } from "@/constants/bible";
import AdminLogin from "@/components/AdminLogin/AdminLogin";

type AuthState = "checking" | "authenticated" | "unauthenticated";
type Category =
  | typeof CONTENTFUL_CATEGORY.movies
  | typeof CONTENTFUL_CATEGORY.news;
type SubmitState = "idle" | "submitting";

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
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [lastCreatedId, setLastCreatedId] = useState<string | null>(null);

  const isMovie = category === CONTENTFUL_CATEGORY.movies;
  const bibleOptions = useMemo(() => Bible, []);

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
    setLastCreatedId(null);
  }

  async function handleCreateArticle(event: FormSubmitEvent) {
    event.preventDefault();
    setSubmitState("submitting");
    setLastCreatedId(null);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      formData.set("category", category);

      const response = await fetch("/api/admin/articles", {
        method: "POST",
        body: formData,
      });
      const result = await readApiResult(response);

      if (!response.ok || !result.ok) {
        toast({
          status: "error",
          title: "업로드에 실패했습니다.",
          description: result.message,
        });
        return;
      }

      form.reset();
      setCategory(CONTENTFUL_CATEGORY.movies);
      setLastCreatedId(result.id ?? null);
      toast({
        status: "success",
        title: "업로드가 완료되었습니다.",
      });
    } finally {
      setSubmitState("idle");
    }
  }

  if (authState === "checking") {
    return (
      <Box w="100%" py="80px" textAlign="center">
        <Text color="grayLetter">확인 중입니다.</Text>
      </Box>
    );
  }

  if (authState === "unauthenticated") {
    return <AdminLogin onLogin={login} />;
  }

  return (
    <Box
      w="100%"
      maxW="720px"
      mx="auto"
      px="16px"
      py={{ base: "24px", md: "48px" }}
    >
      <Flex justify="space-between" align="center" gap="16px" mb="24px">
        <Box>
          <Heading as="h1" size="lg">
            관리자
          </Heading>
        </Box>

        <Button variant="outline" onClick={handleLogout}>
          로그아웃
        </Button>
      </Flex>

      <Divider mb="28px" />

      <Box as="form" onSubmit={handleCreateArticle}>
        <Stack spacing="20px">
          {lastCreatedId && (
            <Alert status="success">
              <AlertIcon />
              생성된 Contentful entry ID: {lastCreatedId}
            </Alert>
          )}

          <FormControl isRequired>
            <FormLabel>카테고리</FormLabel>
            <Select
              name="category"
              value={category}
              onChange={(event) => setCategory(event.target.value as Category)}
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>제목</FormLabel>
            <Input name="title" />
          </FormControl>

          <FormControl>
            <FormLabel>날짜</FormLabel>
            <Input name="date" type="datetime-local" />
          </FormControl>

          {isMovie ? (
            <>
              <FormControl isRequired>
                <FormLabel>유튜브 링크</FormLabel>
                <Input name="youtubeUrl" type="url" />
              </FormControl>

              <FormControl>
                <FormLabel>성경 본문 태그</FormLabel>
                <Select name="tags" defaultValue="">
                  <option value="">선택 안 함</option>
                  {bibleOptions.map((bible) => (
                    <option key={bible} value={bible}>
                      {bible}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </>
          ) : (
            <FormControl isRequired>
              <FormLabel>이미지</FormLabel>
              <Input
                name="image"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                p="6px"
              />
            </FormControl>
          )}

          <Button
            type="submit"
            colorScheme="blue"
            isLoading={submitState === "submitting"}
          >
            업로드
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
