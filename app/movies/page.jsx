import React from "react";
import AppLayout from "../../components/layouts/AppLayout";
import ContentsListView from "../../components/ContentsListView/ContentsListView";
import { filterByTag, sortArticles } from "../../hooks/useArticle";
import { getArticles, getPictures } from "../../lib/contentful";

export const metadata = {
  title: "예배와 말씀",
};

export default async function Movies({ searchParams }) {
  const pictures = await getPictures();
  const articles = await getArticles();
  const filteredArticles = articles.filter((article) => {
    return article.fields.category === "설교영상";
  });
  const sortedArticles = sortArticles(filteredArticles);

  const sp = await searchParams;
  const tag = typeof sp?.v === "string" ? sp.v : undefined;
  const currentPage = parseInt(sp?.page, 10) || 1;
  const posts = filterByTag(sortedArticles, tag);

  return (
    <AppLayout>
      <ContentsListView
        category="설교영상"
        articles={posts}
        pictures={pictures}
        currentPage={currentPage}
      />
    </AppLayout>
  );
}
