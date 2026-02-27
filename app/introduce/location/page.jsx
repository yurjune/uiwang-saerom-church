import React from "react";
import KakaoMap from "@/components/KaKaoMap/KakaoMap";
import { Box } from "@chakra-ui/react";
import TitleBar from "@/components/TitleBar/TitleBar";
import AppLayout from "@/components/layouts/AppLayout";
import { CHURCH_LOCATION, CHURCH_NAME } from "@/constants";
import { ProjectUrl } from "@/constants/projectUrl";
import { ProjectMenu } from "@/constants/menu";

export const metadata = {
  title: ProjectMenu.introduce.location.label,
  description: `${CHURCH_NAME} 오시는길 안내입니다.`,
  alternates: {
    canonical: ProjectUrl.introduce.location.toString(),
  },
  keywords: [CHURCH_NAME, CHURCH_LOCATION, "오시는길", "교회 위치"],
};

export default async function IntroduceLocation() {
  const appKey = process.env.KAKAOMAP_ACCESS_KEY;

  return (
    <AppLayout>
      <TitleBar title="오시는길" />

      <Box fontSize="18px" mb={5}>
        <span>{CHURCH_LOCATION}</span>
      </Box>

      <KakaoMap appKey={appKey} />
    </AppLayout>
  );
}
