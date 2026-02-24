import React from "react";
import AppLayout from "../../../components/layouts/AppLayout";
import NewsPage from "./_components/NewsPage";
import { sortArticles } from "../../../hooks/useArticle";
import { getArticles, getPictures } from "../../../lib/contentful";

export const metadata = {
  title: "교회소식",
};

export default async function CommunityNews({ searchParams }) {
  const pictures = await getPictures();
  const articles = await getArticles();
  const filteredArticles = articles.filter(
    (article) => article.fields.category === "교회소식",
  );
  const sortedArticles = sortArticles(filteredArticles);
  const firstArticle = sortedArticles[0];
  const currentPage = parseInt(searchParams?.page, 10) || 1;

  return (
    <AppLayout pictures={pictures}>
      <NewsPage
        articles={sortedArticles}
        firstArticle={firstArticle}
        currentPage={currentPage}
      />
    </AppLayout>
  );
}
