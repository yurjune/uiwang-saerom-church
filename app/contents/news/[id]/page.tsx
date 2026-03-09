import { cache } from "react";
import type { Metadata } from "next/types";
import { notFound } from "next/navigation";
import AppLayout from "@/components/layouts/AppLayout";
import ContentView from "@/components/ContentView/ContentView";
import {
  getArticleById as _getArticleById,
  getAdjacentArticles,
  getArticles,
} from "@/lib/contentful";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import { CHURCH_INFO, SITE_METADATA } from "@/constants";
import { ProjectUrl } from "@/constants/projectUrl";
import { ProjectMenu } from "@/constants/menu";
import { getArticleShortenDescription } from "@/utils/article-fields";

type RouteParams = { id: string };
type PageProps = { params: Promise<RouteParams> };

const getArticleById = cache(_getArticleById);

export async function generateMetadata({
  params: _params,
}: PageProps): Promise<Metadata> {
  const params = await _params;
  const article = await getArticleById(params.id);
  if (!article) {
    notFound();
  }

  const url = `${ProjectUrl.contents.news.toString()}/${params.id}`;
  const description = getArticleShortenDescription(
    article,
    `${CHURCH_INFO.name} 소식입니다.`,
  );
  const title = article.fields.title || ProjectMenu.news.label;
  const tags = article.fields.tag;
  const keywords = [CHURCH_INFO.name, "교회소식", ...tags];
  const image = article.fields.thumbnailUrl ?? SITE_METADATA.og_image;

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
      publishedTime: article.fields.date,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export async function generateStaticParams(): Promise<RouteParams[]> {
  const { articles } = await getArticles({
    category: CONTENTFUL_CATEGORY.news,
  });
  return articles.map((item) => ({ id: item.sys.id }));
}

export default async function NewsContent({ params: _params }: PageProps) {
  const params = await _params;
  const article = await getArticleById(params.id);
  if (!article) {
    notFound();
  }

  const { prevArticle, nextArticle } = await getAdjacentArticles({
    category: CONTENTFUL_CATEGORY.news,
    date: article.fields.date,
  });

  return (
    <AppLayout>
      <ContentView
        article={article}
        prevId={prevArticle?.sys.id}
        nextId={nextArticle?.sys.id}
      />
    </AppLayout>
  );
}
