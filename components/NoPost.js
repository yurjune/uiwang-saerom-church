"use client";

import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const NoPost = () => {
  return (
    <Flex h="100%" justify="center">
      <Box>게시글이 존재하지 않습니다</Box>
    </Flex>
  );
};

export default NoPost;
