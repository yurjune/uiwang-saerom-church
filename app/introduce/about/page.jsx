import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { CHURCH_NAME } from "@/constants";
import { ProjectUrl } from "@/constants/projectUrl";
import { ProjectMenu } from "@/constants/menu";

export const metadata = {
  title: ProjectMenu.introduce.about.label,
  description: `${CHURCH_NAME}을 소개합니다.`,
  alternates: {
    canonical: ProjectUrl.introduce.about.toString(),
  },
  keywords: [CHURCH_NAME, "교회소개"],
};

export default async function About() {
  return <AppLayout>준비중입니다.</AppLayout>;
}
