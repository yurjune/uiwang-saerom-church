import { Grid, GridItem } from "@chakra-ui/react";
import ContentItemCard from "@/components/ContentListView/ContentItemCard";
import { getLimitedArticles } from "@/utils/articles";
import { categoryToContentUrl } from "@/utils/category";
import type { ArticleEntry } from "@/interface/article";
import { postNumberPerOnePage } from "@/constants/pagination";

type Props = {
  articles: ArticleEntry[];
  currentPage?: number;
  limit?: number;
};

const ContentList = ({
  articles,
  currentPage = 1,
  limit = postNumberPerOnePage,
}: Props) => {
  const limitedArticles = getLimitedArticles(articles, currentPage, limit);

  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(220px, 1fr))"
      columnGap={5}
      rowGap={6}
      px={{ base: "12px", sm: 0 }}
    >
      {limitedArticles.map((article) => {
        const category = article.fields.category;
        const id = article.sys.id;
        const href = `${categoryToContentUrl(category)}/${id}`;
        return (
          <GridItem key={article.sys.id}>
            <ContentItemCard article={article} href={href} />
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default ContentList;
