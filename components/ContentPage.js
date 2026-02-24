"use client";

import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import PostCard from "./PostCard";
import PostCardButton from "./PostCardButton";
import PostArticle from "./PostArticle";
import PostTag from "./PostTag";

const ContentPage = ({ article, articles }) => {
  return (
    <Flex
      justify={{ base: "flex-start", lg: "space-between" }}
      direction={{ base: "column", lg: "row" }}
    >
      <Box w={{ base: "100%", lg: "30%" }} mb={{ base: "40px", lg: "0" }}>
        <PostCard article={article}>
          <PostCardButton article={article} articles={articles} />
        </PostCard>
      </Box>
      <Box w={{ base: "100%", lg: "67%" }}>
        <PostArticle article={article}>
          <PostTag article={article} />
        </PostArticle>
      </Box>
    </Flex>
  );
};

export default ContentPage;
