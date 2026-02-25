import React from "react";
import AppLayout from "../../../components/layouts/AppLayout";
import { createPageMetadata, SEO_KEYWORDS } from "../../../lib/seo";

export const metadata = createPageMetadata({
  title: "교회 소개",
  description: `의왕 새롬교회 소개 페이지입니다.`,
  path: "/introduce/about",
  keywords: SEO_KEYWORDS.about,
});

export default async function About() {
  return <AppLayout>준비중입니다.</AppLayout>;
}
