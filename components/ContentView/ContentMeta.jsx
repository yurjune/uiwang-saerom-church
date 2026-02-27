"use client";

import React from "react";
import { Box, Text } from "@chakra-ui/react";

const ContentMeta = ({ article }) => {
  const { category, title } = article.fields;
  const { createdAt } = article.sys;

  return (
    <Box>
      <Text fontSize="25px" fontWeight="semibold" marginBottom="15px">
        {category}
      </Text>
      <Text marginBottom="10px" fontSize="16px">
        제목: {title}
      </Text>
      <Text marginBottom="10px" fontSize="16px">
        일시: {createdAt.slice(0, 10)}
      </Text>
    </Box>
  );
};

export default ContentMeta;
