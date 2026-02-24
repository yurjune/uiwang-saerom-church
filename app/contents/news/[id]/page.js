import React from "react";
import { notFound } from "next/navigation";
import AppLayout from "../../../../components/layouts/AppLayout";
import ContentView from "../../../../components/ContentView/ContentView";
import { sortArticles } from "../../../../hooks/useArticle";
import {
  getArticleById,
  getArticles,
  getPictures,
} from "../../../../lib/contentful";

export const metadata = {
  title: "교회소식",
};

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((item) => ({ id: item.sys.id }));
}

export default async function NewsContent({ params }) {
  const pictures = await getPictures();
  const article = await getArticleById(params.id);
  const allArticles = await getArticles();
  const filteredArticles = allArticles.filter(
    (item) => item.fields.category === "교회소식",
  );
  const articles = sortArticles(filteredArticles);

  if (!article) {
    notFound();
  }

  return (
    <AppLayout pictures={pictures}>
      <ContentView category="교회소식" article={article} articles={articles} />
    </AppLayout>
  );
}
