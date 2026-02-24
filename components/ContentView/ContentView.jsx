"use client";

import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import PostCard from "../Post/PostCard";
import PostCardButton from "../Post/PostCardButton";
import PostArticle from "../Post/PostArticle";
import PostTag from "../Post/PostTag";

const ContentView = ({ article, articles }) => {
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

export default ContentView;
