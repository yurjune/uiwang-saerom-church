"use client";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { categoryToUrl } from "@/utils/category";

type Props = {
  articleId: string;
  category: string;
  title: string;
};

// 상세 페이지는 정적으로 캐시되므로 관리자 세션은 브라우저에서 확인한다.
const AdminArticleActions = ({ articleId, category, title }: Props) => {
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    let canceled = false;

    fetch("/api/admin/session", { cache: "no-store" })
      .then((response) => response.json())
      .then((result: { authenticated?: boolean }) => {
        if (!canceled) {
          setIsAdmin(Boolean(result.authenticated));
        }
      })
      .catch(() => undefined);

    return () => {
      canceled = true;
    };
  }, []);

  async function handleHide() {
    setIsHiding(true);
    try {
      const response = await fetch(
        `/api/admin/articles/${encodeURIComponent(articleId)}`,
        { method: "DELETE" },
      );
      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
      };
      if (!response.ok || !result.ok) {
        throw new Error(result.message ?? "게시글 숨기기에 실패했습니다.");
      }

      toast({
        status: "success",
        title: "게시글을 숨겼습니다.",
        description: title,
      });
      onClose();
      router.push(categoryToUrl(category));
      router.refresh();
    } catch (error) {
      toast({
        status: "error",
        title: "숨기기에 실패했습니다.",
        description: error instanceof Error ? error.message : undefined,
      });
    } finally {
      setIsHiding(false);
    }
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <HStack>
        <Button
          as={Link}
          href={`/admin/edit/${articleId}`}
          size="sm"
          variant="outline"
        >
          수정
        </Button>
        <Button size="sm" variant="outline" colorScheme="red" onClick={onOpen}>
          숨김
        </Button>
      </HStack>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent mx="16px">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              게시글 숨김
            </AlertDialogHeader>
            <AlertDialogBody>
              &lsquo;{title}&rsquo; 게시글을 숨길까요? 사이트에서는 바로
              사라지지만, Contentful에는 초안으로 남아 다시 게시할 수 있습니다.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} isDisabled={isHiding}>
                취소
              </Button>
              <Button
                colorScheme="red"
                ml="8px"
                onClick={handleHide}
                isLoading={isHiding}
              >
                숨김
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default AdminArticleActions;
