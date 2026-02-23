import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import ContentsBar from "./ContentsBar";
import ItemList from "./ItemList";
import Pagination from "./Pagination";
import NoPost from "./NoPost";

const buttonList = ["전체", "성경", "주제"];
const ContentsListPage = ({ category, articles, pictures }) => {
  return (
    <>
      {articles.length >= 1 ? (
        <>
          <Box mb="30px">
            <ContentsBar category={category} buttonList={buttonList} />
          </Box>
          <Box px={{ base: "20px", sm: "0", md: "0" }} mb="50px">
            <ItemList articles={articles} pictures={pictures} />
          </Box>
          <Pagination articles={articles} />
        </>
      ) : (
        <NoPost />
      )}
    </>
  );
};

export default ContentsListPage;
