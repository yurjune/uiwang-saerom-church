import { Grid, GridItem } from "@chakra-ui/react";
import ContentItemCard from "@/components/ContentListView/ContentItemCard";
import { categoryToContentUrl } from "@/utils/category";
import type { ArticleSummary } from "@/lib/contentful/article";
import { postNumberPerOnePage } from "@/constants/pagination";

const PREFETCH_COUNT = 4;

type Props = {
  articles: ArticleSummary[];
  currentPage: number;
  totalCount: number;
};

const ContentList = ({ articles, currentPage, totalCount }: Props) => {
  const offset = (currentPage - 1) * postNumberPerOnePage;

  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(220px, 1fr))"
      columnGap={5}
      rowGap={6}
      px={{ base: "12px", sm: 0 }}
    >
      {articles.map((article, index) => {
        const category = article.fields.category;
        const id = article.sys.id;
        const href = `${categoryToContentUrl(category)}/${id}`;
        const prefetch = currentPage === 1 && index < PREFETCH_COUNT;
        // 최신순 목록이므로 가장 오래된 글부터 센 순번으로 바꿔, 새 글이 추가돼도 기존 썸네일이 유지되게 한다.
        const sequence = totalCount - 1 - (offset + index);

        return (
          <GridItem key={article.sys.id}>
            <ContentItemCard
              article={article}
              href={href}
              prefetch={prefetch}
              sequence={sequence}
            />
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default ContentList;
