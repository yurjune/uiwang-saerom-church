import React from "react";
import { notFound } from "next/navigation";
import AppLayout from "../../../../components/layouts/AppLayout";
import ContentView from "../../../../components/ContentView/ContentView";
import { getArticleById, getArticles } from "../../../../lib/contentful";
import { getArticleDescription } from "../../../../lib/seo";
import { categoryMap, CONTENTFUL_CATEGORY } from "../../../../constants/category";
import { CHURCH_NAME } from "../../../../constants";

export const revalidate = 300;

export async function generateMetadata({ params: _params }) {
  const params = await _params;
  const article = await getArticleById(params.id);

  if (!article) {
    notFound();
  }

  const title = article.fields?.title || "주일예배";
  const description = getArticleDescription(
    article,
    `${CHURCH_NAME} 설교영상입니다.`,
  );
  const canonical = `${categoryMap[CONTENTFUL_CATEGORY.movies].contentUrl}/${params.id}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
  };
}

export async function generateStaticParams() {
  const articles = await getArticles({ category: CONTENTFUL_CATEGORY.movies });
  return articles.map((item) => ({ id: item.sys.id }));
}

export default async function MovieContent({ params: _params }) {
  const params = await _params;
  const [article, articles] = await Promise.all([
    getArticleById(params.id),
    getArticles({ category: CONTENTFUL_CATEGORY.movies }),
  ]);

  if (!article) {
    notFound();
  }

  return (
    <AppLayout>
      <ContentView article={article} articles={articles} />
    </AppLayout>
  );
}
