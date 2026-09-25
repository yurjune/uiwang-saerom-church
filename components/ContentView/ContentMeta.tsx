import { Box, Text } from "@chakra-ui/react";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import type { ArticleDetail } from "@/lib/contentful/article";

type Props = {
  article: ArticleDetail;
};

const ContentMeta = ({ article }: Props) => {
  const { category, movieType, title } = article.fields;
  const { date } = article.fields;

  return (
    <Box>
      <Text fontSize="25px" fontWeight="semibold" marginBottom="15px">
        {category}
      </Text>
      <Text marginBottom="10px" fontSize="16px">
        제목: {title}
      </Text>
      {category === CONTENTFUL_CATEGORY.movies && (
        <Text marginBottom="10px" fontSize="16px">
          종류: {movieType ?? "기타"}
        </Text>
      )}
      <Text marginBottom="10px" fontSize="16px">
        일시: {date.slice(0, 10)}
      </Text>
    </Box>
  );
};

export default ContentMeta;
