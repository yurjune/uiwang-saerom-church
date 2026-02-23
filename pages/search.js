import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { createClient } from "contentful";
import AppLayout from "../components/AppLayout";
import SimplePage from "../components/SimplePage";
import SearchPage from "../components/SearchPage";
import { sortArticles, searchArticles } from "../hooks/useArticle";

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
  const sortedArticles = sortArticles(articles.items);
  return {
    props: {
      pictures: pictures.items,
      articles: sortedArticles,
    },
  };
};

const Search = ({ pictures, articles }) => {
  const router = useRouter();
  const keyword = router.query.s;
  const message = `'${keyword}' 에 대한 검색 결과 입니다.`;
  // 검색기능: 알골랴, fulltextsearch
  const searchResult = searchArticles(articles, keyword);
  return (
    <>
      <Head>
        <title>검색결과</title>
      </Head>
      <AppLayout pictures={pictures}>
        <SimplePage title={message}>
          <SearchPage articles={searchResult} />
        </SimplePage>
      </AppLayout>
    </>
  );
};

export default Search;
