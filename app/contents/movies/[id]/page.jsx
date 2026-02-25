import React from "react";
import { notFound } from "next/navigation";
import AppLayout from "../../../../components/layouts/AppLayout";
import ContentView from "../../../../components/ContentView/ContentView";
import { sortArticles } from "../../../../utils/articles";
import { getArticleById, getArticles } from "../../../../lib/contentful";
import { getArticleDescription, SITE_URL } from "../../../../lib/seo";

export async function generateMetadata({ params: _params }) {
  const params = await _params;
  const article = await getArticleById(params.id);
  const canonical = `${SITE_URL}/contents/movies/${params.id}`;

  if (!article) {
    return {
      title: "설교영상",
      description: "설교영상 페이지를 찾을 수 없습니다.",
      alternates: {
        canonical,
      },
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const title = article.fields?.title || "주일예배";
  const description = getArticleDescription(
    article,
    "의왕 새롬교회 설교영상 상세 내용입니다.",
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
  const articles = await getArticles();
  const filteredArticles = articles.filter(
    (item) => item.fields.category === "설교영상",
  );
  return filteredArticles.map((item) => ({ id: item.sys.id }));
}

export default async function MovieContent({ params: _params }) {
  const params = await _params;
  const article = await getArticleById(params.id);
  const allArticles = await getArticles();
  const filteredArticles = allArticles.filter(
    (item) => item.fields.category === "설교영상",
  );
  const articles = sortArticles(filteredArticles);

  if (!article) {
    notFound();
  }

  return (
    <AppLayout>
      <ContentView article={article} articles={articles} />
    </AppLayout>
  );
}
