import AppLayout from "@/components/layouts/AppLayout";
import { CHURCH_INFO } from "@/constants";
import { Flex } from "@chakra-ui/react";
import TitleBar from "@/components/TitleBar/TitleBar";
import { worshipSchedule } from "@/components/WorshipTime/constant";
import WorshipTimeItem from "@/components/WorshipTime/WorshipTimeItem";
import { ProjectMenu } from "@/constants/menu";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  alternates: {
    canonical: "/introduce/time",
  },
  title: ProjectMenu.introduce.time.label,
  description: `${CHURCH_INFO.name} 예배시간을 안내합니다.`,
  keywords: [
    CHURCH_INFO.name,
    "예배시간",
    "주일예배",
    "수요예배",
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
