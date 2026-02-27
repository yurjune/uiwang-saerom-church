import React from "react";
import AppLayout from "../../../components/layouts/AppLayout";
import { CHURCH_NAME } from "../../../constants";
import { Flex } from "@chakra-ui/react";
import TitleBar from "../../../components/TitleBar/TitleBar";
import { worshipSchedule } from "../../../components/WorshipTime/constant";
import WorshipTimeItem from "../../../components/WorshipTime/WorshipTimeItem";

export const metadata = {
  title: "예배시간 안내",
  description: `의왕 새롬교회 예배 시간을 안내합니다.`,
  alternates: {
    canonical: "/introduce/time",
  },
  keywords: [
    CHURCH_NAME,
    "예배 시간",
    "주일 예배",
    "수요 예배",
    "주일학교",
    "청년부",
  ],
};

export default async function About() {
  return (
    <AppLayout>
      <TitleBar title="예배시간 안내" />

      {worshipSchedule.map((item) => (
        <Flex key={item.title} w="100%" justify="center">
          <WorshipTimeItem title={item.title} day={item.day} time={item.time} />
        </Flex>
      ))}
    </AppLayout>
  );
}
