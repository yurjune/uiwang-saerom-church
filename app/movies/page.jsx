import React from "react";
import AppLayout from "../../components/layouts/AppLayout";
import ContentListView from "../../components/ContentListView/ContentListView";
import { filterByTag } from "../../utils/articles";
import { getArticles, getPictures } from "../../lib/contentful";
import { createPageMetadata, SEO_KEYWORDS } from "../../lib/seo";

export const metadata = createPageMetadata({
  title: "예배와 말씀",
  description: "주일예배 설교영상과 말씀 콘텐츠를 확인할 수 있습니다.",
  path: "/movies",
  keywords: SEO_KEYWORDS.sermons,
});

export const revalidate = 300;

export default async function Movies({ searchParams }) {
  const [pictures, articles] = await Promise.all([
    getPictures(),
    getArticles({ category: "설교영상" }),
  ]);

  const sp = await searchParams;
  const tag = typeof sp?.v === "string" ? sp.v : undefined;
  const currentPage = parseInt(sp?.page, 10) || 1;
  const posts = filterByTag(articles, tag);

  return (
    <AppLayout>
      <ContentListView
        category="설교영상"
        articles={posts}
        pictures={pictures}
        currentPage={currentPage}
      />
    </AppLayout>
  );
}
