import { Suspense } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import MoviesHeader from "./_components/MoviesHeader";
import MoviesContent from "./_components/MoviesContent";
import { CHURCH_INFO } from "@/constants";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import { ProjectUrl } from "@/constants/projectUrl";
import { ProjectMenu } from "@/constants/menu";
import { Metadata } from "next/types";
import { Divider } from "@chakra-ui/react";
import type { MoviesPageProps } from "./types";

export const metadata: Metadata = {
  alternates: {
    canonical: ProjectUrl.movies.toString(),
  },
  title: ProjectMenu.movies.label,
  description: "설교영상과 말씀 콘텐츠를 확인할 수 있습니다.",
  keywords: [CHURCH_INFO.name, "설교영상", "주일예배"],
};

const category = CONTENTFUL_CATEGORY.movies;

export default async function Movies({ searchParams }: MoviesPageProps) {
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

async function MoviesHeaderTitle({ searchParams }: MoviesPageProps) {
  const resolvedSearchParams = await searchParams;
  const bible = resolvedSearchParams.bible;
  return <span>{category + (bible ? ` - ${bible}` : "")}</span>;
}
