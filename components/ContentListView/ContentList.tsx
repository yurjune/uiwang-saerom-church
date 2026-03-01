"use client";

import { Grid, GridItem } from "@chakra-ui/react";
import ContentItemCard from "@/components/ContentListView/ContentItemCard";
import { getLimitedArticles } from "@/utils/articles";
import { useRouter } from "next/navigation";
import { categoryToContentUrl } from "@/utils/category";
import type { ArticleEntry } from "@/interface/article";

type Props = {
  articles: ArticleEntry[];
  currentPage?: number;
};

const ContentList = ({ articles, currentPage = 1 }: Props) => {
  const router = useRouter();

  const limitedArticles = getLimitedArticles(articles, currentPage);

  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(220px, 1fr))"
      columnGap={5}
      rowGap={6}
      px={{ base: "12px", sm: 0 }}
    >
      {limitedArticles.map((article) => (
        <GridItem key={article.sys.id}>
          <ContentItemCard
            article={article}
            onClickCard={() => {
              const category = article.fields.category;
              const id = article.sys.id;
              router.push(`${categoryToContentUrl(category)}/${id}`);
            }}
          />
        </GridItem>
      ))}
    </Grid>
  );
};

export default ContentList;
