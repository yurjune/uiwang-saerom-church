import { Grid, GridItem } from "@chakra-ui/react";
import ContentItemCard from "@/components/ContentListView/ContentItemCard";
import { categoryToContentUrl } from "@/utils/category";
import type { ArticleSummary } from "@/lib/contentful/article";

const PREFETCH_COUNT = 4;

type Props = {
  articles: ArticleSummary[];
  currentPage: number;
};

const ContentList = ({ articles, currentPage }: Props) => {
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

        return (
          <GridItem key={article.sys.id}>
            <ContentItemCard
              article={article}
              href={href}
              prefetch={prefetch}
            />
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default ContentList;
