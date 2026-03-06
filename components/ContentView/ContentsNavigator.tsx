"use client";

import Link from "next/link";
import { Flex, HStack, Button, Icon } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { categoryToContentUrl, categoryToUrl } from "@/utils/category";
import type { ArticleEntry } from "@/interface/article";

type Props = {
  article: ArticleEntry;
  prevId: string | undefined;
  nextId: string | undefined;
};

const ContentsNavigator = ({ article, prevId, nextId }: Props) => {
  const { category } = article.fields;

  return (
    <Flex direction={{ base: "row", lg: "column" }} justify="space-between">
      <HStack mb={{ base: "0", lg: "15px" }}>
        {!prevId ? (
          <Button colorScheme="blue" size="sm" disabled>
            <Icon as={IoIosArrowBack} boxSize={3} />
          </Button>
        ) : (
          <Button
            as={Link}
            href={`${categoryToContentUrl(category)}/${prevId}`}
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

        {!nextId ? (
          <Button colorScheme="blue" size="sm" disabled>
            <Icon as={IoIosArrowForward} boxSize={3} />
          </Button>
        ) : (
          <Button
            as={Link}
            href={`${categoryToContentUrl(category)}/${nextId}`}
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
