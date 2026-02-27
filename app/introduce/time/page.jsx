import React from "react";
import AppLayout from "../../../components/layouts/AppLayout";
import { createPageMetadata, SEO_KEYWORDS } from "../../../lib/seo";
import { Box, Flex } from "@chakra-ui/react";
import TitleBar from "../../../components/TitleBar/TitleBar";
import { worshipSchedule } from "../../../components/WorshipTime/constant";
import WorshipTimeItem from "../../../components/WorshipTime/WorshipTimeItem";

export const metadata = createPageMetadata({
  title: "예배 시간",
  description: `의왕 새롬교회 예배 시간을 안내합니다.`,
  path: "/introduce/time",
  keywords: SEO_KEYWORDS.time,
});

export default async function About() {
  return (
    <AppLayout>
      <TitleBar title="예배 시간 안내" />

      {worshipSchedule.map((item) => (
        <Flex key={item.title} w="100%" justify="center">
          <WorshipTimeItem title={item.title} day={item.day} time={item.time} />
        </Flex>
      ))}
    </AppLayout>
  );
}
