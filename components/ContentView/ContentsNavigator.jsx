"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Flex, HStack, Button, Icon } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  categoryToContentUrl,
  categoryToUrl,
} from "../../utils/categoryConverter";

const ContentsNavigator = ({ article, articles }) => {
  const router = useRouter();
  const { category } = article.fields;
  const { id } = article.sys;
  const currentIndex = articles.findIndex((el) => el.sys.id === id);

  const isLatest = currentIndex === 0;
  const isOldest = currentIndex === articles.length - 1;

  const moveNext = () => {
    const nextArticle = articles[currentIndex - 1];
    if (nextArticle) {
      const nextId = nextArticle.sys.id;
      return router.push(`${categoryToContentUrl(category)}/${nextId}`);
    }
  };

  const movePrev = () => {
    const prevArticle = articles[currentIndex + 1];
    if (prevArticle) {
      const prevId = prevArticle.sys.id;
      return router.push(`${categoryToContentUrl(category)}/${prevId}`);
    }
  };

  const onClickListBtn = () => {
    router.push(categoryToUrl(category));
  };

  return (
    <Flex direction={{ base: "row", lg: "column" }} justify="space-between">
      <HStack mb={{ base: "0", lg: "15px" }}>
        <Button
          colorScheme="blue"
          size="sm"
          disabled={isOldest}
          onClick={movePrev}
        >
          <Icon as={IoIosArrowBack} boxSize={3} />
        </Button>

        <Button colorScheme="blue" size="sm" onClick={onClickListBtn}>
          <Icon as={HamburgerIcon} boxSize={3} />
        </Button>

        <Button
          colorScheme="blue"
          size="sm"
          disabled={isLatest}
          onClick={moveNext}
        >
          <Icon as={IoIosArrowForward} boxSize={3} />
        </Button>
      </HStack>
    </Flex>
  );
};

export default ContentsNavigator;
