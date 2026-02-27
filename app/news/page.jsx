import React from "react";
import AppLayout from "../../components/layouts/AppLayout";
import NewsPage from "./_components/NewsPage";
import { getArticles } from "../../lib/contentful";
import { CHURCH_NAME } from "../../constants";
import { categoryMap, CONTENTFUL_CATEGORY } from "../../constants/category";

export const metadata = {
  title: "교회소식",
  description: "의왕 새롬교회의 공지와 최근 소식을 확인할 수 있습니다.",
  alternates: {
    canonical: categoryMap[CONTENTFUL_CATEGORY.news].url,
  },
  keywords: [CHURCH_NAME, "교회소식", "공지", "교회행사"],
};

export const revalidate = 300;

export default async function CommunityNews({ searchParams }) {
  const articles = await getArticles({ category: CONTENTFUL_CATEGORY.news });
  const sp = await searchParams;
  const currentPage = parseInt(sp?.page, 10) || 1;

  return (
    <AppLayout>
      <NewsPage articles={articles} currentPage={currentPage} />
    </AppLayout>
  );
}
