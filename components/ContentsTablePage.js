import React from "react";
import { Box } from "@chakra-ui/react";

import TitleBar from "./TitleBar";
import ContentsTable from "./ContentsTable";
import Pagination from "./Pagination";
import Working from "./Working";

const ContentsTablePage = ({ articles, category }) => {
  const tableStyle = {
    colorScheme: "blackAlpha",
  };

  return (
    <>
      {articles.length >= 1 ? (
        <>
          <Box mb="20px">
            <TitleBar title={category}></TitleBar>
          </Box>
          <Box mb="40px">
            <ContentsTable articles={articles} tableStyle={tableStyle} />
          </Box>
          <Pagination articles={articles} category={category} />
        </>
      ) : (
        <Working />
      )}
    </>
  );
};

export default ContentsTablePage;
