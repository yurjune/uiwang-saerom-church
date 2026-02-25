import React from "react";
import AppLayout from "../../components/layouts/AppLayout";
import NewsPage from "./_components/NewsPage";
import { sortArticles } from "../../utils/articles";
import { getArticles } from "../../lib/contentful";
import { createPageMetadata, SEO_KEYWORDS } from "../../lib/seo";

export const metadata = createPageMetadata({
  title: "교회소식",
  description: "의왕 새롬교회의 공지와 최근 소식을 확인할 수 있습니다.",
  path: "/news",
  keywords: SEO_KEYWORDS.news,
});

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
