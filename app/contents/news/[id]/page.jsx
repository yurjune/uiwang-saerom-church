import React from "react";
import { notFound } from "next/navigation";
import AppLayout from "../../../../components/layouts/AppLayout";
import ContentView from "../../../../components/ContentView/ContentView";
import { getArticleById, getArticles } from "../../../../lib/contentful";
import { getArticleDescription } from "../../../../lib/seo";
import { CONTENTFUL_CATEGORY } from "../../../../constants/category";
import { CHURCH_NAME } from "../../../../constants";
import { ProjectUrl } from "../../../../constants/projectUrl";

export const revalidate = 300;

export async function generateMetadata({ params: _params }) {
  const params = await _params;
  const article = await getArticleById(params.id);

  if (!article) {
    notFound();
  }

  const title = article.fields?.title || "교회소식";
  const description = getArticleDescription(
    article,
    `${CHURCH_NAME} 소식입니다.`,
  );
  const canonical = `${ProjectUrl.contents.news.toString()}/${params.id}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
  };
}

export async function generateStaticParams() {
  const articles = await getArticles({ category: CONTENTFUL_CATEGORY.news });
  return articles.map((item) => ({ id: item.sys.id }));
}

export default async function NewsContent({ params: _params }) {
  const params = await _params;
  const [article, articles] = await Promise.all([
    getArticleById(params.id),
    getArticles({ category: CONTENTFUL_CATEGORY.news }),
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
