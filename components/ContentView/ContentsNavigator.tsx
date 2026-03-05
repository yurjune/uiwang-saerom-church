"use client";

import Link from "next/link";
import { Flex, HStack, Button, Icon } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { categoryToContentUrl, categoryToUrl } from "@/utils/category";
import type { ArticleEntry } from "@/interface/article";

type Props = {
  article: ArticleEntry;
  articles: ArticleEntry[];
};

const ContentsNavigator = ({ article, articles }: Props) => {
  const { category } = article.fields;
  const { id } = article.sys;
  const currentIndex = articles.findIndex((el) => el.sys.id === id);

  const isLatest = currentIndex === 0;
  const isOldest = currentIndex === articles.length - 1;
  const nextArticle = isLatest ? null : articles[currentIndex - 1];
  const prevArticle = isOldest ? null : articles[currentIndex + 1];

  return (
    <Flex direction={{ base: "row", lg: "column" }} justify="space-between">
      <HStack mb={{ base: "0", lg: "15px" }}>
        {!prevArticle ? (
          <Button colorScheme="blue" size="sm" disabled>
            <Icon as={IoIosArrowBack} boxSize={3} />
          </Button>
        ) : (
          <Button
            as={Link}
            href={`${categoryToContentUrl(category)}/${prevArticle.sys.id}`}
            colorScheme="blue"
            size="sm"
          >
            <Icon as={IoIosArrowBack} boxSize={3} />
          </Button>
        )}

        <Button
          as={Link}
          href={categoryToUrl(category)}
          colorScheme="blue"
          size="sm"
        >
          <Icon as={IoMenu} boxSize={3} />
        </Button>

        {!nextArticle ? (
          <Button colorScheme="blue" size="sm" disabled>
            <Icon as={IoIosArrowForward} boxSize={3} />
          </Button>
        ) : (
          <Button
            as={Link}
            href={`${categoryToContentUrl(category)}/${nextArticle.sys.id}`}
            colorScheme="blue"
            size="sm"
          >
            <Icon as={IoIosArrowForward} boxSize={3} />
          </Button>
        )}
      </HStack>
    </Flex>
  );
};

export default ContentsNavigator;
