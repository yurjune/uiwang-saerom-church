import React from "react";
import { notFound } from "next/navigation";
import AppLayout from "../../../../components/AppLayout";
import ContentPage from "../../../../components/ContentPage";
import { sortArticles } from "../../../../hooks/useArticle";
import { getArticleById, getArticles, getPictures } from "../../../../lib/contentful";

export const metadata = {
  title: "주일예배",
};

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((item) => ({ id: item.sys.id }));
}

export default async function SundayContent({ params }) {
  const pictures = await getPictures();
  const article = await getArticleById(params.id);
  const allArticles = await getArticles();
  const filteredArticles = allArticles.filter(
    (item) => item.fields.category === "주일예배",
  );
  const articles = sortArticles(filteredArticles);

  if (!article) {
    notFound();
  }

  return (
    <AppLayout pictures={pictures}>
      <ContentPage category="주일예배" article={article} articles={articles} />
    </AppLayout>
  );
}
