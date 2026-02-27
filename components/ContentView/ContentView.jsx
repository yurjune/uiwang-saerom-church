"use client";

import React from "react";
import { Box, Divider, Flex } from "@chakra-ui/react";
import ContentMeta from "@/components/ContentView/ContentMeta";
import ContentsNavigator from "@/components/ContentView/ContentsNavigator";
import ContentBody from "@/components/ContentView/ContentBody";
import ContentTagSection from "@/components/ContentView/ContentTagSection";

const ContentView = ({ article, articles }) => {
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
        <Divider mt="50px" mb="20px" />
        <ContentTagSection article={article} />
      </Box>
    </Flex>
  );
};

export default ContentView;
