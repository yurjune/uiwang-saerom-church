import AppLayout from "@/components/layouts/AppLayout";
import { getArticles } from "@/lib/contentful";
import { CHURCH_INFO } from "@/constants";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import { ProjectUrl } from "@/constants/projectUrl";
import { ProjectMenu } from "@/constants/menu";
import { Metadata } from "next/types";
import ContentsTable from "@/components/ContentsTable/ContentsTable";
import ContentBody from "@/components/ContentView/ContentBody";
import ContentMeta from "@/components/ContentView/ContentMeta";
import { Box, Flex, Divider } from "@chakra-ui/react";
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
  const { articles } = await getArticles({
    category: CONTENTFUL_CATEGORY.news,
  });
  const firstArticle = articles[0];

  if (!firstArticle) {
    return (
      <AppLayout>
        <NoPost />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Box mb="140px">
        <Flex
          justify={{ base: "flex-start", lg: "space-between" }}
          direction={{ base: "column", lg: "row" }}
          gap="20px"
        >
          <Box flex={1} flexShrink={0}>
            <ContentMeta article={firstArticle} />
          </Box>

          <Box flex={2}>
            <ContentBody article={firstArticle} />
          </Box>
        </Flex>
      </Box>

      <Divider />

      <Box mb="40px">
        <ContentsTable articles={articles} />
      </Box>
    </AppLayout>
  );
}
