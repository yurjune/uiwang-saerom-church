import React from "react";
import { notFound } from "next/navigation";
import AppLayout from "../../../../components/layouts/AppLayout";
import ContentView from "../../../../components/ContentView/ContentView";
import { getArticleById, getArticles } from "../../../../lib/contentful";
import { getArticleDescription, SITE_URL } from "../../../../lib/seo";

export const revalidate = 300;

export async function generateMetadata({ params: _params }) {
  const params = await _params;
  const article = await getArticleById(params.id);
  const canonical = `${SITE_URL}/contents/news/${params.id}`;

  if (!article) {
    return {
      title: "교회소식",
      description: "교회소식 페이지를 찾을 수 없습니다.",
      alternates: {
        canonical,
      },
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const title = article.fields?.title || "교회소식";
  const description = getArticleDescription(
    article,
    "의왕 새롬교회의 교회소식 입니다.",
  );

  return {
    title,
    description,
    alternates: {
      canonical,
    },
  };
}

export async function generateStaticParams() {
  const articles = await getArticles({ category: "교회소식" });
  return articles.map((item) => ({ id: item.sys.id }));
}

export default async function NewsContent({ params: _params }) {
  const params = await _params;
  const [article, articles] = await Promise.all([
    getArticleById(params.id),
    getArticles({ category: "교회소식" }),
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
