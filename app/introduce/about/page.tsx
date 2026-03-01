import AppLayout from "@/components/layouts/AppLayout";
import { CHURCH_INFO } from "@/constants";
import { ProjectUrl } from "@/constants/projectUrl";
import { ProjectMenu } from "@/constants/menu";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  alternates: {
    canonical: ProjectUrl.introduce.about.toString(),
  },
  title: ProjectMenu.introduce.about.label,
  description: `${CHURCH_INFO.name}을 소개합니다.`,
  keywords: [CHURCH_INFO.name, "교회소개"],
};

export default async function About() {
  return <AppLayout>준비중입니다.</AppLayout>;
}
