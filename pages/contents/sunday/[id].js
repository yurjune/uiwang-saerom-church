import React from "react";
import Head from "next/head";
import { createClient } from "contentful";
import AppLayout from "../../../components/AppLayout";
import ContentPage from "../../../components/ContentPage";
import { sortArticles } from "../../../hooks/useArticle";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const articles = await client.getEntries({
    content_type: "article",
  });
  const paths = articles.items.map((item) => {
    return {
      params: { id: item.sys.id },
    };
  });
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const pictures = await client.getEntries({
    content_type: "picture",
  });
  const article = await client.getEntries({
    content_type: "article",
    "sys.id": params.id,
  });
  const articles = await client.getEntries({
    content_type: "article",
  });
  const filteredArticles = articles.items.filter(
    (article) => article.fields.category === "주일예배",
  );
  const sortedArticles = sortArticles(filteredArticles);
  return {
    props: {
      pictures: pictures.items,
      article: article.items[0],
      articles: sortedArticles,
    },
  };
};

const Sunday = ({ pictures, article, articles }) => {
  return (
    <>
      <Head>
        <title>주일예배</title>
      </Head>
      <AppLayout pictures={pictures}>
        <ContentPage
          category="주일예배"
          article={article}
          articles={articles}
        />
      </AppLayout>
    </>
  );
};

export default Sunday;
