import { Box, Divider, Flex } from "@chakra-ui/react";
import ContentMeta from "@/components/ContentView/ContentMeta";
import ContentsNavigator from "@/components/ContentView/ContentsNavigator";
import ContentBody from "@/components/ContentView/ContentBody";
import ContentTagSection from "@/components/ContentView/ContentTagSection";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import type { ArticleDetail } from "@/interface/article";

type Props = {
  article: ArticleDetail;
  prevId: string | undefined;
  nextId: string | undefined;
};

const ContentView = ({ article, prevId, nextId }: Props) => {
  const showTag = article.fields.category === CONTENTFUL_CATEGORY.movies;

  return (
    <Flex
      justify={{ base: "flex-start", lg: "space-between" }}
      direction={{ base: "column", lg: "row" }}
      gap="20px"
    >
      <Box flex={1} flexShrink={0}>
        <ContentMeta article={article} />
        <Divider my="20px" />
        <ContentsNavigator article={article} prevId={prevId} nextId={nextId} />
      </Box>

      <Box flex={2}>
        <ContentBody article={article} />

        {showTag && (
          <>
            <Divider mt="50px" mb="20px" />
            <ContentTagSection article={article} />
          </>
        )}
      </Box>
    </Flex>
  );
};

export default ContentView;
