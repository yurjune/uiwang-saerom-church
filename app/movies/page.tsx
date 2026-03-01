import AppLayout from "@/components/layouts/AppLayout";
import ContentListView from "@/components/ContentListView/ContentListView";
import { filterByTag } from "@/utils/articles";
import { getArticles } from "@/lib/contentful";
import { CHURCH_INFO } from "@/constants";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import { ProjectUrl } from "@/constants/projectUrl";
import { ProjectMenu } from "@/constants/menu";

export const metadata = {
  alternates: {
    canonical: ProjectUrl.movies.toString(),
  },
  title: ProjectMenu.movies.label,
  description: "설교영상과 말씀 콘텐츠를 확인할 수 있습니다.",
  keywords: [CHURCH_INFO.name, "설교영상", "주일예배"],
};

export const revalidate = 300;

type SearchParams = {
  v?: string | string[];
  page?: string | string[];
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Movies({ searchParams }: PageProps) {
  const articles = await getArticles({ category: CONTENTFUL_CATEGORY.movies });

  const sp = await searchParams;
  const tag = typeof sp?.v === "string" ? sp.v : undefined;
  const page = typeof sp?.page === "string" ? sp.page : "1";
  const currentPage = parseInt(page, 10) || 1;
  const posts = filterByTag(articles, tag);

  return (
    <AppLayout>
      <ContentListView
        category={CONTENTFUL_CATEGORY.movies}
        articles={posts}
        currentPage={currentPage}
      />
    </AppLayout>
  );
}
