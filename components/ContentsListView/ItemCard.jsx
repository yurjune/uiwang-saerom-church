"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { categoryToContentUrl } from "../../utils/categoryConverter";

const ItemCard = ({ article, pictures }) => {
  const router = useRouter();
  const { title, category } = article.fields;
  const { id, createdAt } = article.sys;
  const thumbnail = article.fields.thumbnail?.fields.file.url;
  const dummyThumbnail = pictures.find(
    (item) => item.fields.title === "더미썸네일",
  ).fields.picture.fields.file.url;

  const onClickImage = () => {
    router.push(`${categoryToContentUrl(category)}/${id}`);
  };

  return (
    <Box textAlign="center" onClick={onClickImage} cursor="pointer">
      <Box
        h="0"
        pb="100%"
        backgroundPosition="center"
        bgImage={
          thumbnail
            ? `url("http:${thumbnail}")`
            : `url("http:${dummyThumbnail}")`
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

export default ItemCard;
