import { Box } from "@chakra-ui/react";
import ContentList from "@/components/ContentListView/ContentList";
import Pagination from "@/components/Pagination/Pagination";
import NoPost from "@/components/NoPost/NoPost";
import { Fragment } from "react";
import type { ArticleSummary } from "@/interface/article";
import { postNumberPerOnePage } from "@/constants/pagination";

type Props = {
  articles: ArticleSummary[];
  currentPage: number;
  totalCount: number;
  createPageHref: (page: number) => string;
};

const ContentListView = ({
  articles,
  currentPage = 1,
  totalCount,
  createPageHref,
}: Props) => {
  const hasArticles = articles.length > 0;

  return (
    <Fragment>
      {!hasArticles ? (
        <NoPost />
      ) : (
        <Fragment>
          <Box mb="50px">
            <ContentList articles={articles} />
          </Box>
          <Pagination
            totalCount={totalCount}
            currentPage={currentPage}
            limit={postNumberPerOnePage}
            createPageHref={createPageHref}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default ContentListView;
