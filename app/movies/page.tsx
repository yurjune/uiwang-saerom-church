import AppLayout from "@/components/layouts/AppLayout";
import MoviesPage from "./_components/MoviesPage";
import { getArticles } from "@/lib/contentful";
import { CHURCH_INFO } from "@/constants";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import { ProjectUrl } from "@/constants/projectUrl";
import { ProjectMenu } from "@/constants/menu";
import { Metadata } from "next/types";

export const revalidate = 86400; // 1 day
export const dynamic = "force-static";

export const metadata: Metadata = {
  alternates: {
    canonical: ProjectUrl.movies.toString(),
  },
  title: ProjectMenu.movies.label,
  description: "설교영상과 말씀 콘텐츠를 확인할 수 있습니다.",
  keywords: [CHURCH_INFO.name, "설교영상", "주일예배"],
};

export default async function Movies() {
  const articles = await getArticles({ category: CONTENTFUL_CATEGORY.movies });

  return (
    <AppLayout>
      <MoviesPage articles={articles} />
    </AppLayout>
  );
}
