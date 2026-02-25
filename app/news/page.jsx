import React from "react";
import AppLayout from "../../components/layouts/AppLayout";
import NewsPage from "./_components/NewsPage";
import { sortArticles } from "../../hooks/useArticle";
import { getArticles } from "../../lib/contentful";

export const metadata = {
  title: "교회소식",
};

export default async function CommunityNews({ searchParams }) {
  const articles = await getArticles();
  const filteredArticles = articles.filter(
    (article) => article.fields.category === "교회소식",
  );
  const sortedArticles = sortArticles(filteredArticles);
  const firstArticle = sortedArticles[0];
  const sp = await searchParams;
  const currentPage = parseInt(sp?.page, 10) || 1;

  return (
    <AppLayout>
      <NewsPage
        articles={sortedArticles}
        firstArticle={firstArticle}
        currentPage={currentPage}
      />
    </AppLayout>
  );
}
