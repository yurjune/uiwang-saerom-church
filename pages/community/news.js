import React from "react";
import Head from "next/head";
import { createClient } from "contentful";
import AppLayout from "../../components/AppLayout";
import NewsPage from "../../components/NewsPage";
import { sortArticles } from "../../hooks/useArticle";

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });
  const pictures = await client.getEntries({
    content_type: "picture",
  });
  const articles = await client.getEntries({
    content_type: "article",
  });
  const filteredArticles = articles.items.filter(
    (article) => article.fields.category === "교회소식",
  );
  const sortedArticles = sortArticles(filteredArticles);
  return {
    props: {
      pictures: pictures.items,
      articles: sortedArticles,
    },
  };
};

const News = ({ pictures, articles }) => {
  const firstArticle = articles[0];
  return (
    <>
      <Head>
        <title>교회소식</title>
      </Head>
      <AppLayout pictures={pictures}>
        <NewsPage articles={articles} firstArticle={firstArticle} />
      </AppLayout>
    </>
  );
};

export default News;
