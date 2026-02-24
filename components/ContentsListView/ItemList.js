"use client";

import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import ItemCard from "./ItemCard";
import { getLimitedArticles } from "../../hooks/useArticle";

const ItemList = ({ articles, pictures, currentPage = 1 }) => {
  const limitedArticles = getLimitedArticles(articles, currentPage);
  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(220px, 1fr))"
      columnGap={5}
      rowGap={6}
    >
      {limitedArticles.map((article) => (
        <GridItem key={article.sys.id}>
          <ItemCard article={article} pictures={pictures} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default ItemList;
