import React from "react";
import AppLayout from "../../components/AppLayout";
import SimplePage from "../../components/SimplePage";
import SearchPage from "../../components/SearchPage";
import { sortArticles, searchArticles } from "../../hooks/useArticle";
import { getArticles, getPictures } from "../../lib/contentful";

export const metadata = {
  title: "검색결과",
};

export default async function Search({ searchParams }) {
  const pictures = await getPictures();
  const articles = await getArticles();
  const sortedArticles = sortArticles(articles);
  const keyword = typeof searchParams?.s === "string" ? searchParams.s : "";
  const message = `'${keyword}' 에 대한 검색 결과 입니다.`;
  const searchResult = keyword ? searchArticles(sortedArticles, keyword) : [];

  return (
    <AppLayout pictures={pictures}>
      <SimplePage title={message}>
        <SearchPage articles={searchResult} />
      </SimplePage>
    </AppLayout>
  );
}
