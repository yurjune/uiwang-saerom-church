import React from "react";
import KakaoMap from "../../../components/KaKaoMap/KakaoMap";
import { Box } from "@chakra-ui/react";
import TitleBar from "../../../components/TitleBar";
import AppLayout from "../../../components/layouts/AppLayout";
import { CHURCH_LOCATION } from "../../../constants";
import { createPageMetadata, SEO_KEYWORDS } from "../../../lib/seo";

export const metadata = createPageMetadata({
  title: "오시는 길",
  description: `${CHURCH_LOCATION} 주소와 지도를 안내합니다.`,
  path: "/introduce/location",
  keywords: SEO_KEYWORDS.location,
});

export default async function CommunityMap() {
  const appKey = process.env.KAKAOMAP_ACCESS_KEY;

  return (
    <AppLayout>
      <Box mb="30px">
        <TitleBar title="오시는 길" />
      </Box>

      <Box fontSize="18px" mb={5}>
        <span>{CHURCH_LOCATION}</span>
      </Box>

      <KakaoMap appKey={appKey} />
    </AppLayout>
  );
}
