"use client";

import { Box } from "@chakra-ui/react";
import ContentListViewHeader from "@/components/ContentListView/ContentListViewHeader";
import ContentList from "@/components/ContentListView/ContentList";
import Pagination from "@/components/Pagination/Pagination";
import NoPost from "@/components/NoPost/NoPost";
import { Fragment } from "react";
import type { ArticleEntry } from "@/interface/article";
import { postNumberPerOnePage } from "@/constants/pagination";

type Props = {
  title: string;
  category: string;
  articles: ArticleEntry[];
  currentPage?: number;
  getPageHref: (page: number) => string;
};

const ContentListView = ({
  title,
  category,
  articles,
  currentPage = 1,
  getPageHref,
}: Props) => {
  const hasArticles = articles.length > 0;

  return (
    <Fragment>
      <Box mb="30px">
        <ContentListViewHeader category={category} title={title} />
      </Box>

      {!hasArticles ? (
        <NoPost />
      ) : (
        <Fragment>
          <Box mb="50px">
            <ContentList
              articles={articles}
              currentPage={currentPage}
              limit={postNumberPerOnePage}
            />
          </Box>
          <Pagination
            totalCount={articles.length}
            currentPage={currentPage}
            limit={postNumberPerOnePage}
            getPageHref={getPageHref}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default ContentListView;
