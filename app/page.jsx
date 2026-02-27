import React from "react";
import { Flex } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Introduction from "../components/Introduction";
import WorshipTime from "../components/WorshipTime/WorshipTime";
import { ChurchLocation } from "../components/ChurchLocation/ChurchLocation";
import { CHURCH_NAME } from "../constants";
import { createPageMetadata, SEO_KEYWORDS, SITE_DESCRIPTION } from "../lib/seo";
import Header from "../components/Header/Header";

export const metadata = createPageMetadata({
  title: CHURCH_NAME,
  description: SITE_DESCRIPTION,
  path: "/",
  keywords: SEO_KEYWORDS.home,
});

export default async function HomePage() {
  const appKey = process.env.KAKAOMAP_ACCESS_KEY;

  return (
    <Flex minH="100vh" direction="column">
      <Header />
      <Introduction />
      <WorshipTime />
      <ChurchLocation appKey={appKey} />
      <Footer />
    </Flex>
  );
}
