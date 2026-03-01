"use client";

import { Box, Divider, Flex } from "@chakra-ui/react";
import ContentMeta from "@/components/ContentView/ContentMeta";
import ContentsNavigator from "@/components/ContentView/ContentsNavigator";
import ContentBody from "@/components/ContentView/ContentBody";
import ContentTagSection from "@/components/ContentView/ContentTagSection";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import type { ArticleEntry } from "@/interface/article";

type Props = {
  article: ArticleEntry;
  articles: ArticleEntry[];
};

const ContentView = ({ article, articles }: Props) => {
  const showTag = article.fields.category === CONTENTFUL_CATEGORY.movies;

  return (
    <Flex
      justify={{ base: "flex-start", lg: "space-between" }}
      direction={{ base: "column", lg: "row" }}
      gap="20px"
    >
      <Box flex={1} flexShrink={0}>
        <ContentMeta article={article} />
        <Divider my="20px" />
        <ContentsNavigator article={article} articles={articles} />
      </Box>

      <Box flex={2}>
        <ContentBody article={article} />

        {showTag && (
          <>
            <Divider mt="50px" mb="20px" />
            <ContentTagSection article={article} />
          </>
        )}
      </Box>
    </Flex>
  );
};

export default ContentView;
