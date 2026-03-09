import AppLayout from "@/components/layouts/AppLayout";
import MoviesPage from "./_components/MoviesPage";
import { getArticles } from "@/lib/contentful";
import { CHURCH_INFO } from "@/constants";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import { ProjectUrl } from "@/constants/projectUrl";
import { ProjectMenu } from "@/constants/menu";
import { Metadata } from "next/types";
import { postNumberPerOnePage } from "@/constants/pagination";

export const metadata: Metadata = {
  alternates: {
    canonical: ProjectUrl.movies.toString(),
  },
  title: ProjectMenu.movies.label,
  description: "설교영상과 말씀 콘텐츠를 확인할 수 있습니다.",
  keywords: [CHURCH_INFO.name, "설교영상", "주일예배"],
};

type SearchParams = {
  page?: string;
  bible?: string;
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

function getCurrentPage(value?: string) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export default async function Movies({
  searchParams: _searchParams,
}: PageProps) {
  const searchParams = await _searchParams;
  const bible = searchParams.bible;
  const currentPage = getCurrentPage(searchParams.page);
  const limit = postNumberPerOnePage;
  const skip = (currentPage - 1) * limit;

  const { articles, totalCount } = await getArticles({
    category: CONTENTFUL_CATEGORY.movies,
    tag: bible,
    limit,
    skip,
  });

  return (
    <AppLayout>
      <MoviesPage
        articles={articles}
        currentPage={currentPage}
        totalCount={totalCount}
        bible={bible}
      />
    </AppLayout>
  );
}
