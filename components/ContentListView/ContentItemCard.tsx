import { Box } from "@chakra-ui/react";
import type { ArticleSummary } from "@/lib/contentful/article";
import Link from "next/link";
import TitleThumbnail from "@/components/ContentListView/TitleThumbnail";

type Props = {
  article: ArticleSummary;
  href: string;
  prefetch?: boolean;
  sequence?: number;
};

const ContentItemCard = ({
  article,
  href,
  prefetch = false,
  sequence = 0,
}: Props) => {
  const { title, date, movieType, thumbnailTitle, thumbnailBible } =
    article.fields;

  return (
    <Link href={href} prefetch={prefetch}>
      <TitleThumbnail
        sequence={sequence}
        title={thumbnailTitle || title}
        bible={thumbnailBible}
      />

      <Box p="20px 10px 0 10px" textAlign="center">
        <Box mb="3px" fontWeight="semibold" wordBreak="keep-all" noOfLines={2}>
          {title}
        </Box>

        <Box fontSize="14px" color="grayLetter">
          {movieType && `${movieType} · `}
          {date.slice(0, 10)}
        </Box>
      </Box>
    </Link>
  );
};

export default ContentItemCard;
