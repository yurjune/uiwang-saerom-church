import { Suspense } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import ContentListView from "@/components/ContentListView/ContentListView";
import MoviesHeader from "./_components/MoviesHeader";
import { getArticles } from "@/lib/contentful";
import { CHURCH_INFO } from "@/constants";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import { ProjectUrl } from "@/constants/projectUrl";
import { ProjectMenu } from "@/constants/menu";
import { Metadata } from "next/types";
import { postNumberPerOnePage } from "@/constants/pagination";
import { Divider } from "@chakra-ui/react";

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

const category = CONTENTFUL_CATEGORY.movies;

export default async function Movies({ searchParams }: PageProps) {
  return (
    <AppLayout>
      <MoviesHeader category={category}>
        <Suspense fallback={<span>{category}</span>}>
          <MoviesHeaderTitle searchParams={searchParams} />
        </Suspense>
      </MoviesHeader>

      <Divider mt="20px" mb="30px" />

      <Suspense fallback={null}>
        <MoviesContent searchParams={searchParams} />
      </Suspense>
    </AppLayout>
  );
}

async function MoviesHeaderTitle({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const bible = resolvedSearchParams.bible;
  return <span>{category + (bible ? ` - ${bible}` : "")}</span>;
}

function getCurrentPage(value?: string) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

async function MoviesContent({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const bible = resolvedSearchParams.bible;
  const currentPage = getCurrentPage(resolvedSearchParams.page);
  const limit = postNumberPerOnePage;
  const skip = (currentPage - 1) * limit;

  const { articles, totalCount } = await getArticles({
    category: CONTENTFUL_CATEGORY.movies,
    tag: bible,
    limit,
    skip,
  });

  const createMoviesPageHref = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    if (bible) {
      params.set("bible", bible);
    }
    return `/movies?${params.toString()}`;
  };

  return (
    <ContentListView
      articles={articles}
      currentPage={currentPage}
      totalCount={totalCount}
      createPageHref={createMoviesPageHref}
    />
  );
}
