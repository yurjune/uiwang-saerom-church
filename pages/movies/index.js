import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { createClient } from "contentful";
import AppLayout from "../../components/AppLayout";
import ContentsListPage from "../../components/ContentsListPage";
import { sortArticles, filterByTag } from "../../hooks/useArticle";

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
  const filteredArticles = articles.items.filter((article) => {
    return (
      article.fields.category === "주일예배" ||
      article.fields.category === "수요예배"
    );
  });
  const sortedArticles = sortArticles(filteredArticles);
  return {
    props: {
      pictures: pictures.items,
      articles: sortedArticles,
    },
  };
};

const Sunday = ({ pictures, articles }) => {
  const router = useRouter();
  const [posts, setPosts] = useState(articles);

  useEffect(() => {
    if (router.isReady) setPosts(filterByTag(articles, router.query.v));
  }, [router.isReady, router.query.v]);

  if (!router.isReady) {
    return (
      <AppLayout pictures={pictures}>
        <div>로딩중...</div>
      </AppLayout>
    );
  }
  return (
    <>
      <Head>
        <title>예배와 말씀</title>
      </Head>
      <AppLayout pictures={pictures}>
        <ContentsListPage
          category="예배와 말씀"
          articles={posts}
          pictures={pictures}
        />
      </AppLayout>
    </>
  );
};

export default Sunday;
