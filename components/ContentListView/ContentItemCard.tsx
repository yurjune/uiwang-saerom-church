"use client";

import { Box } from "@chakra-ui/react";
import Image from "next/image";
import type { ArticleEntry } from "@/interface/article";

type Props = {
  article: ArticleEntry;
  onClickCard: () => void;
};

const ContentItemCard = ({ article, onClickCard }: Props) => {
  const { title } = article.fields;
  const { createdAt } = article.sys;
  const thumbnail = article.fields.thumbnail;
  const thumbnailUrl =
    thumbnail && "fields" in thumbnail ? thumbnail.fields.file?.url : undefined;

  return (
    <Box textAlign="center" onClick={onClickCard} cursor="pointer">
      <Box h="0" pb="100%" position="relative" overflow="hidden" bg="gray.100">
        {thumbnailUrl ? (
          <Image
            src={`https:${thumbnailUrl}`}
            alt="thumbnail"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        ) : null}
      </Box>

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
