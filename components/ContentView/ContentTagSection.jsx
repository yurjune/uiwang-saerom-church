"use client";

import React from "react";
import { Box, Link } from "@chakra-ui/react";
import { categoryToUrl } from "../../utils/category";

const ContentTagSection = ({ article }) => {
  const { category, tag } = article.fields;

  return (
    <Box>
      <Box>태그</Box>

      {tag && (
        <Box mt="16px">
          {tag.map((item, index) => (
            <Link
              key={item + index}
              href={`${categoryToUrl(category)}?v=${item}`}
              mr="10px"
              fontSize="15px"
              color="grayLetter"
            >
              {item},
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ContentTagSection;
