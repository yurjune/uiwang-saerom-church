import AppLayout from "@/components/layouts/AppLayout";
import NewsPage from "./_components/NewsPage";
import { getArticles } from "@/lib/contentful";
import { CHURCH_INFO } from "@/constants";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import { ProjectUrl } from "@/constants/projectUrl";
import { ProjectMenu } from "@/constants/menu";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: ProjectUrl.news.toString(),
  },
  title: ProjectMenu.news.label,
  description: "의왕 새롬교회의 공지와 최근 소식을 확인할 수 있습니다.",
  keywords: [CHURCH_INFO.name, "교회소식", "공지", "교회행사"],
};

export const revalidate = 300;

type SearchParams = {
  page?: string | string[];
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function CommunityNews({ searchParams }: PageProps) {
  const articles = await getArticles({ category: CONTENTFUL_CATEGORY.news });
  const sp = await searchParams;
  const page = typeof sp?.page === "string" ? sp.page : "1";
  const currentPage = parseInt(page, 10) || 1;

  return (
    <AppLayout>
      <NewsPage articles={articles} currentPage={currentPage} />
    </AppLayout>
  );
}
