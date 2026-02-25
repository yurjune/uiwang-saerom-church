"use client";

import React from "react";
import { Box, Flex, Divider } from "@chakra-ui/react";
import PostCard from "../../../components/Post/PostCard";
import PostArticle from "../../../components/Post/PostArticle";
import ContentsTable from "../../../components/ContentsTableView/ContentsTable";
import NoPost from "../../../components/NoPost";
import Pagination from "../../../components/Pagination/Pagination";

const tableStyle = {
  variant: "striped",
  colorScheme: "blackAlpha",
};

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
              <Box
                w={{ base: "100%", lg: "30%" }}
                mb={{ base: "40px", lg: "0" }}
              >
                <PostCard article={firstArticle} />
              </Box>
              <Box w={{ base: "100%", lg: "67%" }}>
                <PostArticle article={firstArticle} />
              </Box>
            </Flex>
          </Box>
          <Divider />
          <Box mb="40px">
            <ContentsTable
              articles={articles}
              tableStyle={tableStyle}
              currentPage={currentPage}
            />
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
