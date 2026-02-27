import React from "react";
import AppLayout from "../../components/layouts/AppLayout";
import ContentListView from "../../components/ContentListView/ContentListView";
import { filterByTag } from "../../utils/articles";
import { getArticles, getPictures } from "../../lib/contentful";
import { CHURCH_NAME } from "../../constants";
import { CONTENTFUL_CATEGORY } from "../../constants/category";
import { ProjectUrl } from "../../constants/projectUrl";

export const metadata = {
  title: "설교영상",
  description: "설교영상과 말씀 콘텐츠를 확인할 수 있습니다.",
  alternates: {
    canonical: ProjectUrl.movies.toString(),
  },
  keywords: [CHURCH_NAME, "설교영상", "주일예배"],
};

export const revalidate = 300;

export default async function Movies({ searchParams }) {
  const [pictures, articles] = await Promise.all([
    getPictures(),
    getArticles({ category: CONTENTFUL_CATEGORY.movies }),
  ]);

  const sp = await searchParams;
  const tag = typeof sp?.v === "string" ? sp.v : undefined;
  const currentPage = parseInt(sp?.page, 10) || 1;
  const posts = filterByTag(articles, tag);

  return (
    <AppLayout>
      <ContentListView
        category={CONTENTFUL_CATEGORY.movies}
        articles={posts}
        pictures={pictures}
        currentPage={currentPage}
      />
    </AppLayout>
  );
}
