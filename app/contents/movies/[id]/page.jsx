import React from "react";
import { notFound } from "next/navigation";
import AppLayout from "@/components/layouts/AppLayout";
import ContentView from "@/components/ContentView/ContentView";
import { getArticleById, getArticles } from "@/lib/contentful";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import { CHURCH_INFO, SITE_METADATA, TWITTER_CONFIG } from "@/constants";
import { ProjectUrl } from "@/constants/projectUrl";
import { ProjectMenu } from "@/constants/menu";
import {
  getArticleThumbnailUrl,
  getArticleDescription,
  getArticleTags,
} from "@/utils/article-fields";

export const revalidate = 300;

export async function generateMetadata({ params: _params }) {
  const params = await _params;
  const article = await getArticleById(params.id);
  if (!article) {
    notFound();
  }

  const url = `${ProjectUrl.contents.movies.toString()}/${params.id}`;
  const title = article.fields?.title || ProjectMenu.movies.label;
  const description = getArticleDescription(
    article,
    `${CHURCH_INFO.name} 설교영상입니다.`,
  );
  const thumbnailUrl = getArticleThumbnailUrl(article);
  const tags = getArticleTags(article);
  const keywords = [CHURCH_INFO.name, "설교영상", ...tags];
  // @ts-ignore
  const image = thumbnailUrl ?? SITE_METADATA.og_image;

  return {
    alternates: {
      canonical: url,
    },
    title,
    description,
    keywords,
    openGraph: {
      url,
      type: "article",
      locale: SITE_METADATA.locale,
      siteName: SITE_METADATA.siteName,
      title,
      description,
      images: [image],
      publishedTime: article.sys.createdAt,
    },
    twitter: {
      card: TWITTER_CONFIG.card,
      title,
      description,
      images: [image],
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
