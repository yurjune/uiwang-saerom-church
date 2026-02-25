import React from "react";
import { notFound } from "next/navigation";
import AppLayout from "../../../../components/layouts/AppLayout";
import ContentView from "../../../../components/ContentView/ContentView";
import { sortArticles } from "../../../../utils/articles";
import { getArticleById, getArticles } from "../../../../lib/contentful";
import { getArticleDescription, SITE_URL } from "../../../../lib/seo";

export const revalidate = 300;

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
  const articles = await getArticles({ category: "설교영상" });
  return articles.map((item) => ({ id: item.sys.id }));
}

export default async function MovieContent({ params: _params }) {
  const params = await _params;
  const [article, allArticles] = await Promise.all([
    getArticleById(params.id),
    getArticles({ category: "설교영상" }),
  ]);
  const articles = sortArticles(allArticles);

  if (!article) {
    notFound();
  }

  return (
    <AppLayout>
      <ContentView article={article} articles={articles} />
    </AppLayout>
  );
}
