"use client";

import React from "react";
import { Box, Flex, Divider } from "@chakra-ui/react";
import ContentMeta from "../../../components/ContentView/ContentMeta";
import ContentBody from "../../../components/ContentView/ContentBody";
import ContentsTable from "../../../components/ContentsTable/ContentsTable";
import NoPost from "../../../components/NoPost";
import Pagination from "../../../components/Pagination/Pagination";

const NewsPage = ({ articles, firstArticle, currentPage = 1 }) => {
  return (
    <>
      {firstArticle ? (
        <>
          <Box mb="140px">
            <Flex
              justify={{ base: "flex-start", lg: "space-between" }}
              direction={{ base: "column", lg: "row" }}
            >
              <Box w={{ base: "100%", lg: "30%" }}>
                <ContentMeta article={firstArticle} />
              </Box>

              <Box my={5}>
                <Divider />
              </Box>

              <Box w={{ base: "100%", lg: "67%" }}>
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
      ) : (
        <NoPost />
      )}
    </>
  );
};

export default NewsPage;
