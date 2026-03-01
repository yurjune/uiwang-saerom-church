"use client";

import { Box, Flex, Divider } from "@chakra-ui/react";
import ContentMeta from "@/components/ContentView/ContentMeta";
import ContentBody from "@/components/ContentView/ContentBody";
import ContentsTable from "@/components/ContentsTable/ContentsTable";
import NoPost from "@/components/NoPost/NoPost";
import Pagination from "@/components/Pagination/Pagination";
import type { ArticleEntry } from "@/interface/article";

type NewsPageProps = {
  articles: ArticleEntry[];
  currentPage?: number;
};

const NewsPage = ({ articles, currentPage = 1 }: NewsPageProps) => {
  const firstArticle = articles[0];
  if (!firstArticle) {
    return <NoPost />;
  }

  return (
    <>
      <Box mb="140px">
        <Flex
          justify={{ base: "flex-start", lg: "space-between" }}
          direction={{ base: "column", lg: "row" }}
          gap="20px"
        >
          <Box flex={1} flexShrink={0}>
            <ContentMeta article={firstArticle} />
          </Box>

          <Box flex={2}>
            <ContentBody article={firstArticle} />
          </Box>
        </Flex>
      </Box>

      <Divider />

      <Box mb="40px">
        <ContentsTable articles={articles} currentPage={currentPage} />
      </Box>

      <Pagination totalCount={articles.length} currentPage={currentPage} />
    </>
  );
};

export default NewsPage;
