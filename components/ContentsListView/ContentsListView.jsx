"use client";

import { Box } from "@chakra-ui/react";
import ContentsBar from "./ContentsBar";
import ItemList from "./ItemList";
import Pagination from "../Pagination/Pagination";
import NoPost from "../NoPost";

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
            <ContentsBar category={category} />
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
