import React from "react";
import AppLayout from "../../components/AppLayout";
import ContentsListPage from "../../components/ContentsListPage";
import { filterByTag, sortArticles } from "../../hooks/useArticle";
import { getArticles, getPictures } from "../../lib/contentful";

export const metadata = {
  title: "예배와 말씀",
};

export default async function Movies({ searchParams }) {
  const pictures = await getPictures();
  const articles = await getArticles();
  const filteredArticles = articles.filter((article) => {
    return (
      article.fields.category === "주일예배" ||
      article.fields.category === "수요예배"
    );
  });
  const sortedArticles = sortArticles(filteredArticles);
  const tag = typeof searchParams?.v === "string" ? searchParams.v : undefined;
  const currentPage = parseInt(searchParams?.page, 10) || 1;
  const posts = filterByTag(sortedArticles, tag);

  return (
    <AppLayout pictures={pictures}>
      <ContentsListPage
        category="예배와 말씀"
        articles={posts}
        pictures={pictures}
        currentPage={currentPage}
      />
    </AppLayout>
  );
}
