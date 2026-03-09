import { Grid, GridItem } from "@chakra-ui/react";
import ContentItemCard from "@/components/ContentListView/ContentItemCard";
import { categoryToContentUrl } from "@/utils/category";
import type { ArticleSummary } from "@/interface/article";

type Props = {
  articles: ArticleSummary[];
};

const ContentList = ({ articles }: Props) => {
  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(220px, 1fr))"
      columnGap={5}
      rowGap={6}
      px={{ base: "12px", sm: 0 }}
    >
      {articles.map((article) => {
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
