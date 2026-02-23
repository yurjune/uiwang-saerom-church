import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import ContentsTable from "./ContentsTable";

const tableStyle = {
  variant: "striped",
  colorScheme: "linkedin",
};
const SearchPage = ({ articles }) => {
  return (
    <>
      {articles.length >= 1 ? (
        <ContentsTable articles={articles} tableStyle={tableStyle} />
      ) : (
        <Flex mt="40px" justify="center">
          <Box>검색 결과가 없습니다.</Box>
        </Flex>
      )}
    </>
  );
};

export default SearchPage;
