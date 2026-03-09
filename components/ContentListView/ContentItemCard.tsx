import { Box } from "@chakra-ui/react";
import Image from "next/image";
import type { ArticleSummary } from "@/interface/article";
import { getArticleThumbnailUrl } from "@/utils/article-fields";
import Link from "next/link";

type Props = {
  article: ArticleSummary;
  href: string;
};

const ContentItemCard = ({ article, href }: Props) => {
  const { title } = article.fields;
  const { date } = article.fields;
  const thumbnailUrl = getArticleThumbnailUrl(article);

  return (
    <Link href={href}>
      <Box h="0" pb="100%" position="relative" overflow="hidden" bg="gray.100">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt="thumbnail"
            fetchPriority="high"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        ) : null}
      </Box>

      <Box p="20px 10px 0 10px" textAlign="center">
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
          {date.slice(0, 10)}
        </Box>
      </Box>
    </Link>
  );
};

export default ContentItemCard;
