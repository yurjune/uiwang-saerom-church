"use client";

import { Box } from "@chakra-ui/react";
import ContentsBar from "./ContentsBar";
import ItemList from "./ItemList";
import Pagination from "../Pagination/Pagination";
import NoPost from "../NoPost";
import { Fragment } from "react";

const ContentsListView = ({
  category,
  articles,
  pictures,
  currentPage = 1,
}) => {
  const hasArticles = articles.length > 0;
  if (!hasArticles) {
    return <NoPost />;
  }

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default ContentsListView;
