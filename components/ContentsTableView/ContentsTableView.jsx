"use client";

import React, { Fragment } from "react";
import { Box } from "@chakra-ui/react";

import TitleBar from "../TitleBar";
import ContentsTable from "./ContentsTable";
import Pagination from "../Pagination/Pagination";

const ContentsTableView = ({ articles, category }) => {
  const tableStyle = {
    colorScheme: "blackAlpha",
  };

  return (
    <Fragment>
      <Box mb="20px">
        <TitleBar title={category}></TitleBar>
      </Box>
      <Box mb="40px">
        <ContentsTable articles={articles} tableStyle={tableStyle} />
      </Box>
      <Pagination articles={articles} />
    </Fragment>
  );
};

export default ContentsTableView;
