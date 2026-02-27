"use client";

import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import ContentItemCard from "@/components/ContentListView/ContentItemCard";
import { getLimitedArticles } from "@/utils/articles";
import { useRouter } from "next/navigation";
import { categoryToContentUrl } from "@/utils/category";

const ContentList = ({ articles, currentPage = 1 }) => {
  const router = useRouter();

  const limitedArticles = getLimitedArticles(articles, currentPage);

  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(220px, 1fr))"
      columnGap={5}
      rowGap={6}
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
