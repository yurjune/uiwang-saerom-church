"use client";

import { Box } from "@chakra-ui/react";
import ContentsBar from "./ContentsBar";
import ItemList from "./ItemList";
import Pagination from "../Pagination/Pagination";
import NoPost from "../NoPost";

const buttonList = ["전체", "성경", "주제"];

const ContentsListView = ({
  category,
  articles,
  pictures,
  currentPage = 1,
}) => {
  return (
    <>
      {articles.length >= 1 ? (
        <>
          <Box mb="30px">
            <ContentsBar category={category} buttonList={buttonList} />
          </Box>
          <Box px={{ base: "20px", sm: "0", md: "0" }} mb="50px">
            <ItemList
              articles={articles}
              pictures={pictures}
              currentPage={currentPage}
            />
          </Box>
          <Pagination articles={articles} currentPage={currentPage} />
        </>
      ) : (
        <NoPost />
      )}
    </>
  );
};

export default ContentsListView;
