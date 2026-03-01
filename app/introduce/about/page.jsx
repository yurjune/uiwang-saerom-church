import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { CHURCH_INFO } from "@/constants";
import { ProjectUrl } from "@/constants/projectUrl";
import { ProjectMenu } from "@/constants/menu";

export const metadata = {
  title: ProjectMenu.introduce.about.label,
  description: `${CHURCH_INFO.name}을 소개합니다.`,
  alternates: {
    canonical: ProjectUrl.introduce.about.toString(),
  },
  keywords: [CHURCH_INFO.name, "교회소개"],
};

export default async function About() {
  return <AppLayout>준비중입니다.</AppLayout>;
}
