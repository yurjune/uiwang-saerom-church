import AppLayout from "@/components/layouts/AppLayout";
import { getNewsArticles } from "@/lib/contentful";
import { CHURCH_INFO } from "@/constants";
import { ProjectUrl } from "@/constants/projectUrl";
import { ProjectMenu } from "@/constants/menu";
import { Metadata } from "next/types";
import ContentsTable from "@/components/ContentsTable/ContentsTable";
import { Box } from "@chakra-ui/react";
import NoPost from "@/components/NoPost/NoPost";

export const metadata: Metadata = {
  alternates: {
    canonical: ProjectUrl.news.toString(),
  },
  title: ProjectMenu.news.label,
  description: "의왕 새롬교회의 공지와 최근 소식을 확인할 수 있습니다.",
  keywords: [CHURCH_INFO.name, "교회소식", "공지", "교회행사"],
};

export default async function CommunityNews() {
  const { articles } = await getNewsArticles();
  if (articles.length === 0) {
    return (
      <AppLayout>
        <NoPost />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Box mb="40px">
        <ContentsTable articles={articles} />
      </Box>
    </AppLayout>
  );
}
