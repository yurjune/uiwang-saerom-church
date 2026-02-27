"use client";

import React from "react";
import { Box } from "@chakra-ui/react";

const ContentItemCard = ({ article, pictures, onClickCard }) => {
  const { title } = article.fields;
  const { createdAt } = article.sys;

  const thumbnailUrl = article.fields.thumbnail?.fields.file.url;
  const dummyThumbnailUrl = pictures.find(
    (item) => item.fields.title === "더미썸네일",
  ).fields.picture.fields.file.url;

  return (
    <Box textAlign="center" onClick={onClickCard} cursor="pointer">
      <Box
        h="0"
        pb="100%"
        backgroundPosition="center"
        bgImage={
          thumbnailUrl
            ? `url("http:${thumbnailUrl}")`
            : `url("http:${dummyThumbnailUrl}")`
        }
        bgSize="cover"
        bgRepeat="no-repeat"
      />

      <Box p="20px 10px 0 10px">
        <Box
          mb="3px"
          fontWeight="semibold"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {title}
        </Box>

        <Box fontSize="14px" color="grayLetter">
          {createdAt.slice(0, 10)}
        </Box>
      </Box>
    </Box>
  );
};

export default ContentItemCard;
