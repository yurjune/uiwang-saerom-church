"use client";

import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const titleStyle = {
  fontSize: { base: "25px", md: "25px" },
  mb: { base: "15px", md: "20px" },
};
const textStyle = {
  ml: "2px",
  mb: { base: "10px", md: "15px" },
  fontSize: "17px",
};

const PostCard = ({ children, article }) => {
  const { category, title } = article.fields;
  const { createdAt } = article.sys;
  return (
    <Flex direction="column">
      <Box>
        <Text {...titleStyle} fontWeight="semibold">
          {category}
        </Text>
        <Text {...textStyle}>제목: {title}</Text>
        <Text {...textStyle}>일시: {createdAt.slice(0, 10)}</Text>
      </Box>
      {children}
    </Flex>
  );
};

export default PostCard;
