"use client";

import { Box } from "@chakra-ui/react";
import ContentListViewHeader from "@/components/ContentListView/ContentListViewHeader";
import ContentList from "@/components/ContentListView/ContentList";
import Pagination from "@/components/Pagination/Pagination";
import NoPost from "@/components/NoPost/NoPost";
import { Fragment } from "react";

const ContentListView = ({ category, articles, currentPage = 1 }) => {
  const hasArticles = articles.length > 0;
  if (!hasArticles) {
    return <NoPost />;
  }

  return (
    <Fragment>
      <Box mb="30px">
        <ContentListViewHeader category={category} />
      </Box>

      <Box mb="50px">
        <ContentList articles={articles} currentPage={currentPage} />
      </Box>

      <Pagination totalCount={articles.length} currentPage={currentPage} />
    </Fragment>
  );
};

export default ContentListView;
