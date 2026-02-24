"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Flex, HStack, Button, Icon, Divider } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HamburgerIcon } from "@chakra-ui/icons";
import { categoryToUrl, categoryToContents } from "../utils/categoryConverter";

const PostCardButton = ({ article, articles }) => {
  const router = useRouter();
  const { category } = article.fields;
  const { id } = article.sys;
  const url = categoryToUrl(category);

  const moveNext = () => {
    const index = articles.findIndex((element) => element.sys.id === id);
    if (articles[index - 1]) {
      const nextId = articles[index - 1].sys.id;
      return router.push(`${categoryToContents(category)}/${nextId}`);
    }
    return alert("마지막 게시글 입니다!");
  };

  const movePrev = () => {
    const index = articles.findIndex((element) => element.sys.id === id);
    if (articles[index + 1]) {
      const prevId = articles[index + 1].sys.id;
      return router.push(`${categoryToContents(category)}/${prevId}`);
    }
    return alert("첫 번째 게시글 입니다!");
  };

  return (
    <>
      <Divider my="20px" />
      <Flex direction={{ base: "row", lg: "column" }} justify="space-between">
        <HStack mb={{ base: "0", lg: "15px" }}>
          <Button size="sm" onClick={movePrev}>
            <Icon as={IoIosArrowBack} boxSize={3} />
          </Button>
          <Button size="sm" onClick={() => router.push(url)}>
            <Icon as={HamburgerIcon} boxSize={3} />
          </Button>
          <Button size="sm" onClick={moveNext}>
            <Icon as={IoIosArrowForward} boxSize={3} />
          </Button>
        </HStack>
      </Flex>
    </>
  );
};

export default PostCardButton;
