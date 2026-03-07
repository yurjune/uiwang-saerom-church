import { Box, Text } from "@chakra-ui/react";
import type { ArticleEntry } from "@/interface/article";

type Props = {
  article: ArticleEntry;
};

const ContentMeta = ({ article }: Props) => {
  const { category, title } = article.fields;
  const { date } = article.fields;

  return (
    <Box>
      <Text fontSize="25px" fontWeight="semibold" marginBottom="15px">
        {category}
      </Text>
      <Text marginBottom="10px" fontSize="16px">
        제목: {title}
      </Text>
      <Text marginBottom="10px" fontSize="16px">
        일시: {date.slice(0, 10)}
      </Text>
    </Box>
  );
};

export default ContentMeta;
