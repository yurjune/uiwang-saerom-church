import React from "react";
import KakaoMap from "../../../components/KaKaoMap/KakaoMap";
import { getPictures } from "../../../lib/contentful";
import { Box, Divider, Stack } from "@chakra-ui/react";
import TitleBar from "../../../components/TitleBar";
import AppLayout from "../../../components/layouts/AppLayout";

export const metadata = {
  title: "오시는길",
};

export default async function CommunityMap() {
  const appKey = process.env.KAKAOMAP_ACCESS_KEY;

  return (
    <AppLayout>
      <Box mb="30px">
        <TitleBar title="오시는길" />
      </Box>

      <KakaoMap appKey={appKey} />

      <Divider my="25px" />

      <Stack fontSize="17px">
        <Box>
          <strong>주소:</strong> 경기 의왕시 내손로 76 보우상가 3층
        </Box>
        <Box>(지번) 경기 의왕시 내손동 637</Box>
      </Stack>
    </AppLayout>
  );
}
